import axios from 'axios';
import { Actions } from './baseActions';
import { GET_MESSAGES } from './types';
import APIs from '../api';

const entity = 'contactUs';
let actions = new Actions(entity, 'CONTACT_US');

export const get = actions.get;
export const search = actions.search;
export const add = actions.add;
export const edit = actions.edit;
export const del = actions.delete;
export const clear = actions.clear;

export const submitForm = entityData => dispatch => {
  dispatch(actions.clearErrors());
  return axios
    .post(`${APIs[entity].root}`, entityData)
    .then(res => {
      return res.data.data;
    })
    .catch(err => {
      dispatch({
        type: GET_MESSAGES,
        payload: err.response.data || err.response
      });
    });
};
