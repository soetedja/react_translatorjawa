import { GET_ACTIVE_STARRED_TRANSLATION } from '../actions/types';

const initialState = { active: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVE_STARRED_TRANSLATION:
      return {
        ...state,
        active: action.payload
      };
    default:
      return state;
  }
}
