import { Actions } from './baseActions';

const entity = 'wordType';
let actions = new Actions(entity, 'WORD_TYPE');

export const get = actions.get;
export const search = actions.search;
export const add = actions.add;
export const edit = actions.edit;
export const del = actions.delete;
export const clear = actions.clear;
