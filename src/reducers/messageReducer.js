import { GET_MESSAGES, CLEAR_MESSAGE, CLEAR_ALL_MESSAGES } from '../actions/types';

const initialState = {
  messages: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.payload;
    case CLEAR_MESSAGE:
      if (state.messages && action.payload !== null) {
        var fil = state.messages.filter(function(eachElem, index) {
          return action.payload !== index;
        });
        return { ...state, messages: fil };
      } else {
        return initialState;
      }
    case CLEAR_ALL_MESSAGES: {
      return initialState;
    }
    default:
      return state;
  }
}
