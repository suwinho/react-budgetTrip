export const ACTIONS = {
  START_LOADING: "START_LOADING",
  SET_ERROR: "SET_ERROR",
  LOAD_SUCCESS: "LOAD_SUCCESS",
  LOAD_FROM_CACHE: "LOAD_FROM_CACHE",
  SET_CURRENT_TRIP: "SET_CURRENT_TRIP",
  REMOVE_ATTRACTION: "REMOVE_ATTRACTION",
  ADD_ATTRACTION: "ADD_ATTRACTION",
};

export const initialState = {
  hotels: [],
  cache: {},
  loading: false,
  error: null,
  currentTrip: null,
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

  if (action.type === ACTIONS.SET_CURRENT_TRIP) {
    return {
      ...state,
      currentTrip: {
        hotel: action.payload.hotel,
        attractions: action.payload.attractions,
      },
    };
  }

  if (action.type === ACTIONS.REMOVE_ATTRACTION) {
    if (!state.currentTrip) return state;
    return {
      ...state,
      currentTrip: {
        ...state.currentTrip,
        attractions: state.currentTrip.attractions.filter(
          (_, index) => index !== action.payload
        ),
      },
    };
  }

  if (action.type === ACTIONS.ADD_ATTRACTION) {
    if (!state.currentTrip) return state;
    return {
      ...state,
      currentTrip: {
        ...state.currentTrip,
        attractions: [action.payload, ...state.currentTrip.attractions],
      },
    };
  }

  return state;

  return state;
}
