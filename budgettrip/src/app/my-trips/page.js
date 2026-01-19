"use client";

import { useState } from "react";
import TripFilters from "@/app/components/TripFilters";
import { useHotelContext } from "@/app/context/HotelContext";
import TripList from "@/app/components/TripList";
import styles from "@/app/components/MyTrips.module.css";

export default function MyTripsPage() {
  const { savedTrips } = useHotelContext();

  const [filterText, setFilterText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showHighPriceOnly, setShowHighPriceOnly] = useState(false);
  const [sortType, setSortType] = useState("date");

  const getFilteredTrips = () => {
    let filtered = savedTrips.filter((trip) => {
      const name = trip.hotelName || "";
      const city = trip.city || "";

      const matchesText =
        name.toLowerCase().includes(filterText.toLowerCase()) ||
        city.toLowerCase().includes(filterText.toLowerCase());

      const matchesStatus =
        filterStatus === "all" ? true : trip.status === filterStatus;

      const priceVal =
        typeof trip.price === "string" ? parseFloat(trip.price) : trip.price;
      const matchesPrice = showHighPriceOnly ? priceVal > 1000 : true;

      return matchesText && matchesStatus && matchesPrice;
    });

    filtered.sort((a, b) => {
      const priceA =
        typeof a.price === "string" ? parseFloat(a.price) : a.price;
      const priceB =
        typeof b.price === "string" ? parseFloat(b.price) : b.price;

      if (sortType === "price") return priceA - priceB;
      if (sortType === "name")
        return (a.hotelName || "").localeCompare(b.hotelName || "");
      if (sortType === "date") return new Date(b.date) - new Date(a.date);
      return 0;
    });

    return filtered;
  };

  const visibleTrips = getFilteredTrips();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>📂 Moje Wycieczki</h1>

      <TripFilters
        filterText={filterText}
        setFilterText={setFilterText}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        showHighPriceOnly={showHighPriceOnly}
        setShowHighPriceOnly={setShowHighPriceOnly}
        sortType={sortType}
        setSortType={setSortType}
      />

      <TripList trips={visibleTrips} />
    </main>
  );
}
