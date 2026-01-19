"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useState,
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

  const [savedTrips, setSavedTrips] = useState([
    {
      id: 101,
      hotelName: "Grand Hotel Sopot",
      city: "Sopot",
      price: 1200,
      status: "completed",
      date: "2023-07-10",
      details: null,
    },
    {
      id: 102,
      hotelName: "Zakopane Resort",
      city: "Zakopane",
      price: 2100,
      status: "planned",
      date: "2024-02-15",
      details: null,
    },
    {
      id: 103,
      hotelName: "Hotel Mercure",
      city: "Warszawa",
      price: 650,
      status: "cancelled",
      date: "2023-11-20",
      details: null,
    },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        dispatch({ type: ACTIONS.INIT_STORE, payload: parsedData });

        if (parsedData.savedTrips && Array.isArray(parsedData.savedTrips)) {
          if (parsedData.savedTrips.length > 0) {
            setSavedTrips(parsedData.savedTrips);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    const dataToSave = {
      cache: state.cache,
      currentTrip: state.currentTrip,
      hotels: state.hotels,
      savedTrips: savedTrips,
    };

    if (
      Object.keys(state.cache).length > 0 ||
      state.currentTrip ||
      savedTrips.length > 0
    ) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    }
  }, [state.cache, state.currentTrip, state.hotels, savedTrips]);

  const searchHotels = useCallback(
    async (city) => {
      if (state.cache[city]) {
        dispatch({ type: ACTIONS.LOAD_FROM_CACHE, payload: city });
        return;
      }

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
    const tripId = hotel.location_id || hotel.id || "new";
    router.push(`/trip/${tripId}`);
  };

  const addAttraction = (attr) =>
    dispatch({ type: ACTIONS.ADD_ATTRACTION, payload: attr });

  const removeAttraction = (idx) =>
    dispatch({ type: ACTIONS.REMOVE_ATTRACTION, payload: idx });

  const saveCurrentTripToHistory = () => {
    if (!state.currentTrip) return;

    let priceValue = 0;
    if (state.currentTrip.hotel?.price) {
      const priceString = String(state.currentTrip.hotel.price);
      priceValue = parseFloat(priceString.replace(/[^0-9.]/g, "")) || 0;
    }

    const newTripEntry = {
      id: Date.now(),
      hotelName: state.currentTrip.hotel.name,
      city: "Twoja Wycieczka",
      price: priceValue,
      status: "planned",
      date: new Date().toISOString().split("T")[0],
      details: state.currentTrip,
    };

    setSavedTrips((prev) => [newTripEntry, ...prev]);
  };

  const value = {
    ...state,
    searchHotels,
    startTripPlanning,
    addAttraction,
    removeAttraction,
    savedTrips,
    saveCurrentTripToHistory,
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
