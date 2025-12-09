"use client";

import { createContext, useContext, useReducer, useCallback } from "react";
import {
  hotelReducer,
  initialState,
  ACTIONS,
} from "@/app/context/HotelReducer";
import { fetchHotelsFromAPI } from "@/app/lib/fetchHotels";

const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(hotelReducer, initialState);

  const searchHotels = useCallback(
    async (city) => {
      if (state.cache[city]) {
        console.log(`📦 [Store] Mamy "${city}" w pamięci. Nie pobieram z API.`);

        dispatch({
          type: ACTIONS.LOAD_FROM_CACHE,
          payload: city,
        });
        return;
      }

      console.log(`🌐 [API] Brak "${city}" w pamięci. Pobieram z sieci...`);

      dispatch({ type: ACTIONS.START_LOADING });

      try {
        const data = await fetchHotelsFromAPI(city);

        if (!data || data.length === 0) {
          throw new Error("Nie znaleziono hoteli w tym mieście.");
        }

        dispatch({
          type: ACTIONS.LOAD_SUCCESS,
          payload: { city: city, hotels: data },
        });
      } catch (err) {
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: err.message,
        });
      }
    },
    [state.cache]
  );

  const value = {
    ...state,
    searchHotels,
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
