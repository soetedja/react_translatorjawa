import {
  TRANSLATE,
  SELECT_OPTION_TRANSLATE,
  GET_WORD_DICTIONARY_DETAILS
} from '../actions/types';
import objectToArray from '../utils/objectToArray';

const initialState = {
  dictionaryResult: [],
  result: {
    basic: '',
    advanced: []
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TRANSLATE:
      return {
        ...state,
        result: action.payload || initialState.result
      };
    case GET_WORD_DICTIONARY_DETAILS:
      return {
        ...state,
        dictionaryResult: action.payload
      };
    case SELECT_OPTION_TRANSLATE:
      return {
        ...state,
        result: {
          ...state.result,
          advanced: objectToArray(action.payload)
        }
      };
    default:
      return state;
  }
}
