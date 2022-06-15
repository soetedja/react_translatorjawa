import axios from 'axios';
import APIs from '../api';
import objectToArray from '../utils/objectToArray';
// import { Actions } from './baseActions';
import {
  GET_MESSAGES,
  GET_WORD_DICTIONARY_DETAILS,
  SELECT_OPTION_TRANSLATE,
  TRANSLATE
} from './types';

const entity = 'translate';
// const reducerName = entity.toUpperCase();
// const actions = new Actions(entity);

export const translate = input => (dispatch, getState) => {
  let langsFrom = getState().language.from;
  let langsTo = getState().language.to;
  let to = getState().language.selectedTo;
  let from = getState().language.selectedFrom;
  let idSelectedTo = to.indexOf(true);
  let idSelectedFrom = from.indexOf(true);
  let params = {
    from: langsFrom[idSelectedFrom].code,
    to: langsTo[idSelectedTo].code,
    source: input || ''
  };

  return axios
    .post(`${APIs[entity].root}`, params)
    .then(res => {
      // actions.toastr(res.data.messages);
      dispatch({
        type: TRANSLATE,
        payload: res.data.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_MESSAGES,
        payload: err.response.data || err.response
      });
    });
};

export const getWordDictionaryDetails = id => dispatch => {
  return axios
    .post(`${APIs[entity].root}getWordDictionaryDetails`, { id })
    .then(res => {
      dispatch({
        type: GET_WORD_DICTIONARY_DETAILS,
        payload: res.data.data.member
      });
    })
    .catch(err => {
      dispatch({
        type: GET_WORD_DICTIONARY_DETAILS,
        payload: []
      });
      dispatch({
        type: GET_MESSAGES,
        payload: err.response.data || err.response
      });
    });
};

export const selectOption = (id, key) => (dispatch, getState) => {
  let state = getState().translate.result.advanced;
  let advanced = state[id];
  let selected = advanced[key];
  advanced.splice(key, 1);
  advanced.unshift(selected);

  dispatch({
    type: SELECT_OPTION_TRANSLATE,
    payload: objectToArray(state)
  });
};

export const clearResult = () => dispatch => {
  dispatch({
    type: TRANSLATE,
    payload: null
  });
};
