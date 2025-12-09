"use client";

import { useState } from "react";
import SearchBar from "@/app/components/SearchBar";
import HotelList from "@/app/components/HotelsList";
import SortButtons from "@/app/components/SortButtons";
import { useHotelContext } from "@/app/context/HotelContext";
import { getSortedHotels } from "@/app/lib/hotelUtils";

export default function Home() {
  const { hotels, loading, error, searchHotels } = useHotelContext();

  const [sortBy, setSortBy] = useState("recommended");
  const hotelsToShow = getSortedHotels(hotels, sortBy);

  return (
    <main
      style={{
        minHeight: "100vh",
        fontFamily: "sans-serif",
        padding: "40px 20px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1>Wyszukiwarka Hoteli</h1>
        <SearchBar onSearch={searchHotels} />
      </div>

      {loading && (
        <p style={{ textAlign: "center", color: "blue" }}>
          ⏳ Sprawdzam pamięć i pobieram dane...
        </p>
      )}

      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {!loading && hotelsToShow.length > 0 && (
        <p style={{ textAlign: "center", color: "green" }}>
          Znaleziono {hotelsToShow.length} ofert:
        </p>
      )}

      {hotelsToShow.length > 0 && (
        <SortButtons activeSort={sortBy} onSortChange={setSortBy} />
      )}

      <HotelList hotels={hotelsToShow} />
    </main>
  );
}
