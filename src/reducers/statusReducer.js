import { GET_STATUSES } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_STATUSES:
      return {
        ...state,
        all: action.payload
      };
    default:
      return state;
  }
}
