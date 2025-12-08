"use client";

import { useState } from "react";
import { fetchHotelsFromAPI } from "@/app/lib/fetchHotels";
import { getSortedHotels } from "@/app/lib/hotelUtils";

export const useHotelSearch = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("recommended");

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    setHotels([]);

    try {
      const data = await fetchHotelsFromAPI(city);

      if (!data || data.length === 0) {
        setError("Hotels not found in this city");
      } else {
        setHotels(data);
      }
    } catch (err) {
      setError("Error");
    } finally {
      setLoading(false);
    }
  };

  const hotelsToShow = getSortedHotels(hotels, sortBy);

  return {
    hotels,
    loading,
    error,
    sortBy,
    setSortBy,
    handleSearch,
    hotelsToShow,
  };
};
