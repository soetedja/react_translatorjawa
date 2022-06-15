import { Actions } from './baseActions';

let actions = new Actions('appSetting', 'APP_SETTING');

export const get = actions.get;
export const search = actions.search;
export const add = actions.add;
export const edit = actions.edit;
export const del = actions.delete;
export const clear = actions.clear;
