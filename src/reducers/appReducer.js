import { SET_ASIDE_TAB_OPEN, TOGGLE_SIGNIN_MODAL } from '../actions/types';

const initialState = {
  aSideTab: '1',
  signInModal: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ASIDE_TAB_OPEN:
      return {
        ...state,
        aSideTab: action.payload.tab,
        aSideOpen:
          action.payload.open === undefined
            ? state.aSideOpen
            : action.payload.open
      };
    case TOGGLE_SIGNIN_MODAL:
      return {
        ...state,
        signInModal: action.payload
      };
    default:
      return state;
  }
}
