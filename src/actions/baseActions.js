import { message } from 'antd';
import axios from 'axios';
import APIs from '../api';
import { CLEAR_ALL_MESSAGES, GET_MESSAGES } from './types';

export class Actions {
  constructor(entity, reducerName = entity.toUpperCase()) {
    this.entity = entity;
    this.reducerName = reducerName;
  }
  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();

  get = id => dispatch => {
    return axios
      .get(`${APIs[this.entity].root}${id}`)
      .then(res =>
        dispatch({
          type: `GET_${this.reducerName}`,
          payload: res.data.data
        })
      )
      .catch(err =>
        dispatch({
          type: `GET_${this.reducerName}`,
          payload: null
        })
      );
  };

  searchWithCancelToken = (params, cancelTokenSource) => dispatch => {
    console.log(cancelTokenSource.token);
    return axios
      .post(`${APIs[this.entity].root}search`, params, {
        cancelToken: cancelTokenSource.token
      })
      .then(res => {
        dispatch({
          type: `SEARCH_${this.reducerName}`,
          payload: res.data.data
        });
        dispatch({
          type: `SEARCH_CRITERIA_${this.reducerName}`,
          payload: params
        });
      })
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
        } else {
          dispatch({
            type: `SEARCH_${this.reducerName}`,
            payload: { items: [], limit: 10, page: 1, total_items: 0 }
          });
          dispatch({
            type: GET_MESSAGES,
            payload: err.response.data || err.response
          });
        }
      });

    // cancel the request (the message parameter is optional)
    // this.source.cancel('Operation canceled by the user.');
  };

  search = params => dispatch => {
    return axios
      .post(`${APIs[this.entity].root}/search`, params)
      .then(res => {
        dispatch({
          type: `SEARCH_${this.reducerName}`,
          payload: res.data.data
        });
        dispatch({
          type: `SEARCH_CRITERIA_${this.reducerName}`,
          payload: params
        });
      })
      .catch(err => {
        dispatch({
          type: `SEARCH_${this.reducerName}`,
          payload: { items: [], limit: 10, page: 1, total_items: 0 }
        });
        dispatch({
          type: GET_MESSAGES,
          payload: err.response.data || err.response
        });
      });
  };

  add = (entityData, history) => dispatch => {
    dispatch(clearErrors());
    return axios
      .post(`${APIs[this.entity].root}`, entityData)
      .then(res => {
        toastrMessages(res.data.messages);
        dispatch({
          type: `ADD_${this.reducerName}`,
          payload: {}
        });
        dispatch({
          type: `USE_LAST_SEARCH_CRITERIA_${this.reducerName}`
        });
        history.goBack();
      })
      .catch(err => {
        dispatch({
          type: GET_MESSAGES,
          payload: err.response.data || err.response
        });
      });
  };

  edit = (putData, history) => dispatch => {
    dispatch(clearErrors());
    return axios
      .put(`${APIs[this.entity].root}${putData.id}`, putData)
      .then(res => {
        toastrMessages(res.data.messages);
        dispatch({
          type: `EDIT_${this.reducerName}`,
          payload: {}
        });
        dispatch({
          type: `USE_LAST_SEARCH_CRITERIA_${this.reducerName}`
        });
        history.goBack();
      })
      .catch(err => {
        dispatch({
          type: GET_MESSAGES,
          payload: err.response.data || err.response
        });
      });
  };

  delete = id => dispatch => {
    dispatch(clearErrors());
    return axios
      .delete(`${APIs[this.entity].root}${id}`)
      .then(res => {
        toastrMessages(res.data.messages);
        dispatch({
          type: `DELETE_${this.reducerName}`,
          payload: id
        });
      })
      .catch(err =>
        dispatch({
          type: GET_MESSAGES,
          payload: err.response.data || err.response
        })
      );
  };

  clearErrors = () => dispatch => {
    dispatch(clearErrors());
  };

  clear = key => dispatch => {
    switch (key) {
      case 'search':
        dispatch({
          type: `SEARCH_${this.reducerName}`,
          payload: null
        });
        break;
      default:
        dispatch({
          type: `CLEAR_${this.reducerName}`
        });
        dispatch({
          type: `USE_LAST_SEARCH_CRITERIA_${this.reducerName}`
        });
        break;
    }
  };

  toastr = messages => {
    toastrMessages(messages);
  };
}

export const clearErrors = idx => dispatch => {
  dispatch({
    type: CLEAR_ALL_MESSAGES,
    payload: null
  });
};

const toastrMessages = messages => {
  const duration = 100;
  for (var msg in messages) {
    let item = messages[msg];
    switch (item.type) {
      case 'success':
        message.success(item.message, duration);
        break;
      case 'info':
        message.info(item.message, duration);
        break;
      case 'warning':
        message.warning(item.message, duration);
        break;
      case 'error':
        message.danger(item.message, duration);
        break;
      default:
        message.info(item.message, duration);
        break;
    }
  }
};
