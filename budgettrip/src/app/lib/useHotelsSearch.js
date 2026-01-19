"use client";

import { useState, useMemo } from "react";
import { fetchHotelsFromAPI } from "@/app/lib/fetchHotels";
import { getSortedHotels } from "@/app/lib/hotelUtils";

export const useHotelSearch = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [sortBy, setSortBy] = useState("domyslne");

  const [filters, setFilters] = useState({
    price: null,
    stars: [],
  });

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    setHotels([]);

    try {
      const data = await fetchHotelsFromAPI(city);
      if (!data || data.length === 0) {
        setError("Nie znaleziono hoteli w tym mieście");
      } else {
        setHotels(data);
      }
    } catch (err) {
      setError("Wystąpił błąd podczas pobierania danych");
    } finally {
      setLoading(false);
    }
  };

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      if (filters.price === "under_200" && hotel.price >= 200) return false;
      if (filters.price === "over_200" && hotel.price <= 200) return false;

      if (filters.stars.length > 0 && !filters.stars.includes(hotel.stars)) {
        return false;
      }

      return true;
    });
  }, [hotels, filters]);

  const hotelsToShow = getSortedHotels(filteredHotels, sortBy);

  const togglePriceFilter = (value) => {
    setFilters((prev) => ({
      ...prev,
      price: prev.price === value ? null : value,
    }));
  };

  const toggleStarFilter = (starValue) => {
    setFilters((prev) => {
      const isSelected = prev.stars.includes(starValue);
      return {
        ...prev,
        stars: isSelected
          ? prev.stars.filter((s) => s !== starValue)
          : [...prev.stars, starValue],
      };
    });
  };

  return {
    hotels,
    loading,
    error,
    sortBy,
    setSortBy,
    filters,
    togglePriceFilter,
    toggleStarFilter,
    handleSearch,
    hotelsToShow,
  };
};
