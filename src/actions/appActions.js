import { SET_ASIDE_TAB_OPEN, TOGGLE_SIGNIN_MODAL } from './types';

// Set logged in user
export const toggleAside = (open, tab) => {
  if (open) {
    document.body.classList.add('aside-menu-show');
  } else {
    document.body.classList.remove('aside-menu-show');
  }
  return {
    type: SET_ASIDE_TAB_OPEN,
    payload: { open, tab: tab || '1' }
  };
};

export const setActiveTab = tab => {
  return {
    type: SET_ASIDE_TAB_OPEN,
    payload: { tab: tab || '1' }
  };
};

export const toggleSignInModal = open => {
  return {
    type: TOGGLE_SIGNIN_MODAL,
    payload: open || false
  };
};
