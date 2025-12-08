"use client";

import SearchBar from "@/app/components/SearchBar";
import HotelList from "@/app/components/HotelsList";
import SortButtons from "@/app/components/SortButtons";
import { useHotelSearch } from "@/app/lib/useHotelsSearch";

export default function Home() {
  const {
    hotels,
    loading,
    error,
    sortBy,
    setSortBy,
    handleSearch,
    hotelsToShow,
  } = useHotelSearch();

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
        <SearchBar onSearch={handleSearch} />
      </div>

      {loading && (
        <p style={{ textAlign: "center", fontSize: "1.2rem", color: "blue" }}>
          ⏳ Pobieranie ofert z Booking.com...
        </p>
      )}

      {error && (
        <div
          style={{
            textAlign: "center",
            color: "red",
            border: "1px solid red",
            padding: 10,
            maxWidth: 600,
            margin: "20px auto",
          }}
        >
          <strong>Błąd:</strong> {error}
        </div>
      )}

      {!loading && hotels.length > 0 && (
        <p style={{ textAlign: "center", color: "green" }}>
          Znaleziono {hotels.length} ofert:
        </p>
      )}

      {hotelsToShow.length > 0 && (
        <SortButtons activeSort={sortBy} onSortChange={setSortBy} />
      )}

      <HotelList hotels={hotelsToShow} />
    </main>
  );
}
