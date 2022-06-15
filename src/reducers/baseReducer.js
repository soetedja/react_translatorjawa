export default function createReducerWithNamedType(reducerName = '') {
  return function reducer(state, action) {
    switch (action.type) {
      case `SEARCH_${reducerName}`:
        return {
          ...state,
          searchResult: action.payload || {
            items: [],
            total_items: 0
          }
        };
      case `SEARCH_CRITERIA_${reducerName}`:
        return {
          ...state,
          lastSearchCriteria: { ...action.payload, use: false }
          // useLastSearchCriteria: {...state.lastSearchCriteria, use: true}
        };
      case `USE_LAST_SEARCH_CRITERIA_${reducerName}`:
        return {
          ...state,
          lastSearchCriteria: { ...state.lastSearchCriteria, use: true }
        };
      case `GET_${reducerName}`:
        return {
          ...state,
          current: action.payload
        };
      case `ADD_${reducerName}`:
        return {
          ...state,
          current: action.payload
        };
      case `EDIT_${reducerName}`:
        return {
          ...state,
          current: action.payload
        };
      case `DELETE_${reducerName}`:
        return state;
      case `CLEAR_${reducerName}`:
        return {
          ...state,
          current: {}
        };
      default:
        return state;
    }
  };
}
