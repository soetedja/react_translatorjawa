import axios from 'axios';
import APIs from '../api';
import { Actions } from './baseActions';

import { GET_MESSAGES, GET_ACTIVE_STARRED_TRANSLATION } from './types';

const entity = 'starredTranslation';
let actions = new Actions(entity, 'STARRED_TRANSLATION');

export const get = actions.get;
export const search = actions.search;
// export const add = actions.add;
export const edit = actions.edit;
export const del = actions.delete;
export const clear = actions.clear;

export const add = (source, result) => (dispatch, getState) => {
  let langsFrom = getState().language.from;
  let langsTo = getState().language.to;
  let to = getState().language.selectedTo;
  let from = getState().language.selectedFrom;
  let idSelectedTo = to.indexOf(true);
  let idSelectedFrom = from.indexOf(true);
  let params = {
    language_source_id: langsFrom[idSelectedFrom].id,
    language_result_id: langsTo[idSelectedTo].id,
    source_text: source,
    result_text: result
  };

  return axios
    .post(`${APIs[entity].root}`, params)
    .then(res => {
      actions.toastr(res.data.messages);
      return res;
    })
    .catch(err => {
      dispatch({
        type: GET_MESSAGES,
        payload: err.response.data || err.response
      });
    });
};

// Get Active Starred Translation
export const getSavedTranslation = () => dispatch => {
  axios
    .get(`${APIs[entity].root}getActive`)
    .then(res =>
      dispatch({
        type: GET_ACTIVE_STARRED_TRANSLATION,
        payload: res.data.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ACTIVE_STARRED_TRANSLATION,
        payload: []
      });
      dispatch({
        type: GET_MESSAGES,
        payload: err.response.data || err.response.data || err.response
      });
    });
};
