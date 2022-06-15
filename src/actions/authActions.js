import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import APIs from '../api';
import { GET_MESSAGES, SET_CURRENT_USER, LOGOUT } from './types';
import { REFRESH_TOKEN_BEFORE, GUEST_USER_ID } from '../constants';
import { getSavedTranslation } from './starredTranslationActions';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_MESSAGES,
        payload: err.response.data || err.response
      })
    );
};

// Login - Get User Token
export const loginUser = auth => dispatch => {
  axios
    .post(
      `${APIs.index.authenticate}`,
      {},
      {
        auth
      }
    )
    .then(res => {
      dispatch(handleLoginSuccess(res.data.data));
    })
    .catch(err =>
      dispatch({
        type: GET_MESSAGES,
        payload: err.response.data || err.response
      })
    );
};

// SignIn As Guest
export const signInAsGuest = auth => dispatch => {
  axios
    .post(`${APIs.index.signInAsGuest}`, {})
    .then(res => {
      dispatch(handleLoginSuccess(res.data.data));
    })
    .catch(err =>
      dispatch({
        type: GET_MESSAGES,
        payload: err.response.data || err.response
      })
    );
};

// Login - Get User Token
export const refreshToken = refresh_token => dispatch => {
  axios
    .post(`${APIs.user.refreshToken}`, {
      refresh_token
    })
    .then(res => {
      dispatch(handleRefreshTokenSuccess(res.data.data));
    })
    .catch(err => {
      console.log(err)
      dispatch(setCurrentUser({}));
      dispatch({
        type: GET_MESSAGES,
        payload: err.response.data || err.response
      })
    }
    );
};

const handleRefreshTokenSuccess = data => dispatch => {
  const { expiry_time, refresh_token, token } = data;
  // Set token to ls
  localStorage.setItem('jwtToken', token);
  localStorage.setItem('expiry_time', expiry_time);
  localStorage.setItem('refresh_token', refresh_token);

  let expire_in = expiry_time - REFRESH_TOKEN_BEFORE * 60;
  var utcSeconds = expire_in;
  var d = new Date(0);
  d.setUTCSeconds(utcSeconds);

  const timeout = d - new Date();

  if (timeout < 0) {
    dispatch(refreshToken(localStorage.refresh_token));
  } else {
    setTimeout(() => {
      dispatch(refreshToken(localStorage.refresh_token));
    }, timeout);
  }
  // setTimeout(() => {
  //   dispatch(refreshToken(refresh_token));
  // }, timeout);

  // Set token to Auth header
  setAuthToken(token);
};

const handleLoginSuccess = data => dispatch => {
  const { expiry_time, refresh_token, token, user } = data;
  // Set token to ls
  localStorage.setItem('jwtToken', token);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('expiry_time', expiry_time);
  localStorage.setItem('refresh_token', refresh_token);

  // let expire_in = expiry_time - 1 * 3600; // you can configure as you want but here it is 1 hour before token will get expired
  let expire_in = expiry_time - 1 * 30; // you can configure as you want but here it is 1 min before token will get expired
  var utcSeconds = expire_in;
  var d = new Date(0);
  d.setUTCSeconds(utcSeconds);

  const timeout = d - new Date();
  setTimeout(() => {
    dispatch(refreshToken(refresh_token));
  }, timeout);

  // Set token to Auth header
  setAuthToken(token);

  if (GUEST_USER_ID !== user.id) {
    dispatch(getSavedTranslation());
  }
  // Set current user
  dispatch(setCurrentUser(user));
};

// Login - Get User Token
export const googleAuth = tokenId => dispatch => {
  axios
    .post(`${APIs.index.googleAuth}`, {
      tokenId
    })
    .then(res => {
      console.log('TCL: res', res);
      dispatch(handleLoginSuccess(res.data.data));
    })
    .catch(err =>
      dispatch({
        type: GET_MESSAGES,
        payload: err.data || err
      })
    );
};

export const logout = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('user');
  localStorage.removeItem('expiry_time');
  localStorage.removeItem('refresh_token');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));

  dispatch({
    type: LOGOUT
  });
};
// Set logged in user
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};
