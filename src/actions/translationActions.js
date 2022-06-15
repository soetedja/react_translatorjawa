import axios from 'axios';

import { Actions } from './baseActions';
import { GET_MESSAGES } from './types';
import APIs from '../api';

const entity = 'translation';
const reducerName = entity.toUpperCase();
const actions = new Actions(entity);

export const get = actions.get;
export const search = actions.search;
export const add = actions.add;
export const edit = actions.edit;
export const del = actions.delete;
export const clear = actions.clear;
// export const toastr = actions.toastr;

export const createByWord = entityData => dispatch => {
  actions.clear();
  return axios
    .post(`${APIs[entity].createByWord}`, entityData)
    .then(res => {
      actions.toastr(res.data.messages);
      dispatch({
        type: `ADD_${reducerName}`,
        payload: {}
      });
      dispatch({
        type: `USE_LAST_SEARCH_CRITERIA_${reducerName}`
      });
    })
    .catch(err => {
      dispatch({
        type: GET_MESSAGES,
        payload: err.response.data || err.response
      });
    });
};

export const updateByDetails = entityData => dispatch => {
  actions.clear();
  return axios
    .put(
      `${APIs[entity].updateByDetails}${entityData.translation_id}`,
      entityData
    )
    .then(res => {
      actions.toastr(res.data.messages);
      dispatch({
        type: `UPDATE_${reducerName}`,
        payload: {}
      });
      dispatch({
        type: `USE_LAST_SEARCH_CRITERIA_${reducerName}`
      });
    })
    .catch(err => {
      dispatch({
        type: GET_MESSAGES,
        payload: err.response.data || err.response
      });
    });
};
