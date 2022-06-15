import axios from 'axios';
import { Actions } from './baseActions';
import { GET_SUGGESTION_WORD, GET_MESSAGES } from './types';
import APIs from '../api';

const entity = 'word';
let actions = new Actions(entity);

export const get = actions.get;
export const search = actions.search;
export const add = actions.add;
export const edit = actions.edit;
export const del = actions.delete;
export const clear = actions.clear;

export const getAllSuggestionWord = param => dispatch => {
  return axios
    .post(`${APIs[entity].root}getAllSuggestionWord`, param)
    .then(res => {
      // let options = res.data.data.map(category => ({
      //   value: category.id,
      //   label: category.word
      // }));
      // console.log('TCL: options', options);
      // return options;
      // dispatch({
      //   type: GET_SUGGESTION_WORD,
      //   payload: res.data.data
      // });
      return res.data.data;
    })
    .catch(err => {
      dispatch({
        type: GET_SUGGESTION_WORD,
        payload: []
      });
      dispatch({
        type: GET_MESSAGES,
        payload: err.response.data || err.response
      });
    });
};

export const getSuggestionWord = (value, lang) => dispatch => {
  return axios
    .post(`${APIs[entity].root}getSuggestionWord`, { value, lang })
    .then(res => {
      return res.data.data;
    })
    .catch(err => {
      dispatch({
        type: GET_SUGGESTION_WORD,
        payload: []
      });
      dispatch({
        type: GET_MESSAGES,
        payload: err.response.data || err.response
      });
    });
};
