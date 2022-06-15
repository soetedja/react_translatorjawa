import {
  GET_LANGUAGES,
  SELECT_FROM_LANGUAGE,
  SELECT_TO_LANGUAGE
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_LANGUAGES:
      return {
        ...state,
        all: action.payload,
        from: action.payload,
        to: action.payload,
        selectedFrom: [
          true,
          ...new Array(action.payload.length - 1).fill(false)
        ],
        selectedTo: [
          false,
          true,
          ...new Array(action.payload.length - 2).fill(false)
        ]
      };
    case SELECT_FROM_LANGUAGE:
      return {
        ...state,
        selectedFrom: action.payload
      };
    case SELECT_TO_LANGUAGE:
      return {
        ...state,
        selectedTo: action.payload
      };
    default:
      return state;
  }
}
