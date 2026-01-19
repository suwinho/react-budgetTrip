"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { hotelReducer, initialState } from "./HotelReducer";
import { ACTIONS } from "./HotelReducer";
import { fetchHotelsFromAPI } from "@/app/lib/fetchHotels";

const HotelContext = createContext();
const STORAGE_KEY = "HOTEL_APP_DB_V1";

export const HotelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(hotelReducer, initialState);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        console.log("Data fetched form local storage!");
        dispatch({ type: ACTIONS.INIT_STORE, payload: parsedData });
      } catch (e) {
        console.error("Błąd odczytu danych", e);
      }
    }
  }, []);

  useEffect(() => {
    const dataToSave = {
      cache: state.cache,
      currentTrip: state.currentTrip,
      hotels: state.hotels,
    };

    if (Object.keys(state.cache).length > 0 || state.currentTrip) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    }
  }, [state.cache, state.currentTrip, state.hotels]);

  const searchHotels = useCallback(
    async (city) => {
      if (state.cache[city]) {
        console.log("Data fetched from cache");
        dispatch({ type: ACTIONS.LOAD_FROM_CACHE, payload: city });
        return;
      }

      console.log("API Request...");
      dispatch({ type: ACTIONS.START_LOADING });
      try {
        const data = await fetchHotelsFromAPI(city);
        if (!data?.length) throw new Error("Brak wyników");
        dispatch({
          type: ACTIONS.LOAD_SUCCESS,
          payload: { city, hotels: data },
        });
      } catch (err) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: err.message });
      }
    },
    [state.cache],
  );

  const startTripPlanning = (hotel, attractions) => {
    dispatch({ type: ACTIONS.SET_TRIP, payload: { hotel, attractions } });
    router.push(`/trip/${hotel.location_id}`);
  };

  const addAttraction = (attr) =>
    dispatch({ type: ACTIONS.ADD_ATTRACTION, payload: attr });
  const removeAttraction = (idx) =>
    dispatch({ type: ACTIONS.REMOVE_ATTRACTION, payload: idx });

  const value = {
    ...state,
    searchHotels,
    startTripPlanning,
    addAttraction,
    removeAttraction,
  };

  return (
    <HotelContext.Provider value={value}>{children}</HotelContext.Provider>
  );
};

export const useHotelContext = () => {
  const context = useContext(HotelContext);
  if (!context) throw new Error("Brak HotelProvider!");
  return context;
};
