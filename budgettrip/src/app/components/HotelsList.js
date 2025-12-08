import HotelCard from "@/app/components/HotelCard";

export default function HotelList({ hotels }) {
  console.log("HotelList otrzymał:", hotels);

  if (!hotels || hotels.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#888" }}>
        Brak wyników do wyświetlenia.
      </p>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      {hotels.map((hotel, index) => (
        <HotelCard key={hotel.location_id || index} hotel={hotel} />
      ))}
    </div>
  );
}
