import { GET_SUGGESTION_WORD } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_SUGGESTION_WORD:
      return {
        ...state,
        suggestionWords: action.payload
      };
    default:
      return state;
  }
}
