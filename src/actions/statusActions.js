// import axios from 'axios';

import { Actions } from './baseActions';
import {
  GET_STATUSES
  // , GET_ERRORS
} from './types';
// import APIs from '../api';
import { STATUSES } from '../constants';

const entity = 'status';
const actions = new Actions(entity);

export const get = actions.get;
export const search = actions.search;
export const add = actions.add;
export const edit = actions.edit;
export const del = actions.delete;
export const clear = actions.clear;

// Get Statutes
export const getStatuses = () => dispatch => {
  dispatch({
    type: GET_STATUSES,
    payload: STATUSES
  });

  // axios
  //   .get(`${APIs[entity].root}`)
  //   .then(res =>
  //     dispatch({
  //       type: GET_STATUSES,
  //       payload: res.data.data
  //     })
  //   )
  //   .catch(err => {
  //     dispatch({
  //       type: GET_STATUSES,
  //       payload: []
  //     });
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload:  err.response.data || err.response
  //     });
  //   });
};
