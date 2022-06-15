// import axios from 'axios';

// import APIs from '../api';
import { LANGUAGES } from '../constants';
import { Actions } from './baseActions';
import {
  GET_LANGUAGES,
  // GET_ERRORS,
  SELECT_FROM_LANGUAGE,
  SELECT_TO_LANGUAGE
} from './types';

const entity = 'language';
let actions = new Actions(entity);

export const get = actions.get;
export const search = actions.search;
export const add = actions.add;
export const edit = actions.edit;
export const del = actions.delete;
export const clear = actions.clear;

// Get Language
export const getLanguages = () => dispatch => {
  dispatch({
    type: GET_LANGUAGES,
    payload: LANGUAGES
  });

  // axios
  //   .get(`${APIs[entity].root}`)
  //   .then(res =>
  //     dispatch({
  //       type: GET_LANGUAGES,
  //       payload: res.data.data
  //     })
  //   )
  //   .catch(err => {
  //     dispatch({
  //       type: GET_LANGUAGES,
  //       payload: []
  //     });
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload:  err.response.data || err.response
  //     });
  //   });
};

export const selectFrom = data => (dispatch, getState) => {
  let to = getState().language.selectedTo;
  let idSelectedTo = to.indexOf(true);
  let idSelectedFrom = data.indexOf(true);
  if (idSelectedTo === idSelectedFrom) {
    dispatch({
      type: SELECT_TO_LANGUAGE,
      payload: getState().language.selectedFrom
    });
  }
  dispatch({
    type: SELECT_FROM_LANGUAGE,
    payload: data
  });
};

export const selectTo = data => (dispatch, getState) => {
  let from = getState().language.selectedFrom;
  let idSelectedFrom = from.indexOf(true);
  let idSelectedTo = data.indexOf(true);
  if (idSelectedFrom === idSelectedTo) {
    dispatch({
      type: SELECT_FROM_LANGUAGE,
      payload: getState().language.selectedTo
    });
  }
  dispatch({
    type: SELECT_TO_LANGUAGE,
    payload: data
  });
};

export const swap = data => (dispatch, getState) => {
  let from = getState().language.selectedFrom;
  let to = getState().language.selectedTo;
  dispatch({
    type: SELECT_FROM_LANGUAGE,
    payload: to
  });
  dispatch({
    type: SELECT_TO_LANGUAGE,
    payload: from
  });
};
