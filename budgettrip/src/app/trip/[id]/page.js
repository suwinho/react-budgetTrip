"use client";

import { useState } from "react";
import { useHotelContext } from "@/app/context/HotelContext";
import { useRouter } from "next/navigation";

export default function TripEditorPage() {
  const { currentTrip, removeAttraction, addAttraction } = useHotelContext();

  const [newAttr, setNewAttr] = useState("");

  if (!currentTrip) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Brak danych wycieczki.</h2>
      </div>
    );
  }

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newAttr.trim()) return;

    addAttraction({
      name: newAttr,
      ranking: "Własna atrakcja",
      photo: "https://via.placeholder.com/100?text=Moja",
    });
    setNewAttr("");
  };

  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ margin: 0 }}>
          Planujesz pobyt w: {currentTrip.hotel.name}
        </h1>
        <p style={{ color: "#666" }}>Cena hotelu: {currentTrip.hotel.price}</p>
      </div>

      <h2>Twoja lista atrakcji (Edycja)</h2>

      <form
        onSubmit={handleAdd}
        style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
      >
        <input
          type="text"
          placeholder="Wpisz nazwę własnej atrakcji..."
          value={newAttr}
          onChange={(e) => setNewAttr(e.target.value)}
          style={{ flex: 1, padding: "10px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "green",
            color: "white",
            border: "none",
          }}
        >
          + Dodaj
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {currentTrip.attractions.map((attr, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px",
              borderBottom: "1px solid #eee",
              backgroundColor: "#fff",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              {attr.photo && (
                <img
                  src={attr.photo}
                  alt=""
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "5px",
                    objectFit: "cover",
                  }}
                />
              )}
              <div>
                <strong>{attr.name}</strong>
                <div style={{ fontSize: "0.8rem", color: "#888" }}>
                  {attr.ranking}
                </div>
              </div>
            </div>

            <button
              onClick={() => removeAttraction(index)}
              style={{
                background: "#ff4d4d",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Usuń 🗑️
            </button>
          </li>
        ))}
      </ul>

      {currentTrip.attractions.length === 0 && (
        <p style={{ textAlign: "center", color: "#888" }}>
          Twoja lista jest pusta. Dodaj coś!
        </p>
      )}
    </main>
  );
}
