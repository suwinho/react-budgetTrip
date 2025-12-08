// app/components/HotelCard.js
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./HotelCard.module.css";
import TripModal from "./TripModal";

export default function HotelCard({ hotel }) {
  const [showPlan, setShowPlan] = useState(false);

  if (!hotel.name) return null;

  return (
    <>
      <div className={styles.card}>
        <Link
          href={hotel.web_url}
          target="_blank"
          className={styles.imageContainer}
        >
          <img
            src={
              hotel.photo?.images?.large?.url ||
              "https://via.placeholder.com/300x200?text=Brak+Zdjecia"
            }
            alt={hotel.name}
            className={styles.image}
          />
        </Link>

        <div className={styles.content}>
          <Link
            href={hotel.web_url}
            target="_blank"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h3 className={styles.name}>{hotel.name}</h3>
          </Link>

          <div className={styles.info}>
            <span className={styles.rating}>⭐ {hotel.rating}</span>
            <span className={styles.reviews}>({hotel.num_reviews} opinii)</span>
          </div>

          <div className={styles.footer}>
            <span className={styles.price}>{hotel.price}</span>

            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                onClick={() => setShowPlan(true)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#00aa6c",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              >
                🗺️ Plan
              </button>

              <Link
                href={hotel.web_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.fakeButton}
                style={{ textDecoration: "none" }}
              >
                Oferta &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showPlan && (
        <TripModal hotel={hotel} onClose={() => setShowPlan(false)} />
      )}
    </>
  );
}
