export const ACTIONS = {
  INIT_STORE: "INIT_STORE",
  START_LOADING: "START_LOADING",
  SET_ERROR: "SET_ERROR",
  LOAD_SUCCESS: "LOAD_SUCCESS",
  LOAD_FROM_CACHE: "LOAD_FROM_CACHE",
  SET_TRIP: "SET_TRIP",
  ADD_ATTRACTION: "ADD_ATTRACTION",
  REMOVE_ATTRACTION: "REMOVE_ATTRACTION",
};

export const initialState = {
  hotels: [],
  cache: {},
  currentTrip: null,
  loading: false,
  error: null,
};

export function hotelReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INIT_STORE:
      return {
        ...state,
        cache: action.payload.cache || {},
        currentTrip: action.payload.currentTrip || null,
        hotels: action.payload.hotels || [],
      };

    case ACTIONS.START_LOADING:
      return { ...state, loading: true, error: null };

    case ACTIONS.SET_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ACTIONS.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        hotels: action.payload.hotels,
        cache: { ...state.cache, [action.payload.city]: action.payload.hotels },
      };

    case ACTIONS.LOAD_FROM_CACHE:
      return {
        ...state,
        loading: false,
        hotels: state.cache[action.payload],
      };

    case ACTIONS.SET_TRIP:
      return { ...state, currentTrip: action.payload };

    case ACTIONS.ADD_ATTRACTION:
      if (!state.currentTrip) return state;
      return {
        ...state,
        currentTrip: {
          ...state.currentTrip,
          attractions: [action.payload, ...state.currentTrip.attractions],
        },
      };

    case ACTIONS.REMOVE_ATTRACTION:
      if (!state.currentTrip) return state;
      return {
        ...state,
        currentTrip: {
          ...state.currentTrip,
          attractions: state.currentTrip.attractions.filter(
            (_, i) => i !== action.payload
          ),
        },
      };

    default:
      return state;
  }
}
