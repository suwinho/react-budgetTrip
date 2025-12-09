export const ACTIONS = {
  START_LOADING: "START_LOADING",
  SET_ERROR: "SET_ERROR",
  LOAD_SUCCESS: "LOAD_SUCCESS",
  LOAD_FROM_CACHE: "LOAD_FROM_CACHE",
};

export const initialState = {
  hotels: [],
  cache: {},
  loading: false,
  error: null,
};

export function hotelReducer(state, action) {
  if (action.type === ACTIONS.START_LOADING) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }

  if (action.type === ACTIONS.SET_ERROR) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  }

  if (action.type === ACTIONS.LOAD_SUCCESS) {
    return {
      ...state,
      loading: false,
      hotels: action.payload.hotels,
      cache: {
        ...state.cache,
        [action.payload.city]: action.payload.hotels,
      },
    };
  }

  if (action.type === ACTIONS.LOAD_FROM_CACHE) {
    return {
      ...state,
      loading: false,
      hotels: state.cache[action.payload],
    };
  }

  return state;
}
