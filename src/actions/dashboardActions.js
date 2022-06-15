import axios from 'axios';
import APIs from '../api';
import { GET_MESSAGES, GET_DASHBOARD_DATA } from './types';
// let actions = new Actions('appSetting', 'APP_SETTING');

const entity = 'dashboard';
// let actions = new Actions(entity);

export const getDashboardData = () => dispatch => {
  axios
    .get(`${APIs[entity].root}`)
    .then(res =>
      dispatch({
        type: GET_DASHBOARD_DATA,
        payload: res.data.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_DASHBOARD_DATA,
        payload: []
      });
      dispatch({
        type: GET_MESSAGES,
        payload: err.response.data || err.response
      });
    });
};
