"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { fetchAttractions } from "@/app/lib/fetchAttractions";
import styles from "./TripModal.module.css"; // Import stylów

export default function TripModal({ hotel, onClose }) {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (hotel?.latitude && hotel?.longitude) {
      setLoading(true);
      fetchAttractions(hotel.latitude, hotel.longitude)
        .then((data) => setAttractions(data))
        .finally(() => setLoading(false));
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [hotel]);

  if (!mounted || !hotel) return null;

  const modalContent = (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeBtn}>
          ✖ Zamknij
        </button>

        <div className={styles.header}>
          <h2>🗺️ Twój Plan Podróży</h2>
          <p>
            Baza wypadowa: <strong>{hotel.name}</strong>
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.column}>
            <h3>🏨 Hotel</h3>
            <img
              src={hotel.photo.images.large.url}
              alt={hotel.name}
              className={styles.image}
            />
            <p>
              <strong>Cena:</strong> {hotel.price}
            </p>
            <p>
              <strong>Ocena:</strong> {hotel.rating}
            </p>
            <a href={hotel.web_url} target="_blank" className={styles.link}>
              Rezerwuj na Booking
            </a>
          </div>

          <div className={styles.column}>
            <h3>📸 Co zwiedzić w okolicy? (TripAdvisor)</h3>
            {loading ? (
              <p>⏳ Generowanie planu zwiedzania...</p>
            ) : attractions.length > 0 ? (
              <ul className={styles.list}>
                {attractions.map((attr, index) => (
                  <li key={index} className={styles.listItem}>
                    <div className={styles.attractionName}>
                      {index + 1}. {attr.name}
                    </div>
                    <div className={styles.attractionMeta}>{attr.ranking}</div>
                    {attr.photo && (
                      <img
                        src={attr.photo}
                        alt={attr.name}
                        className={styles.thumb}
                      />
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nie znaleziono atrakcji w pobliżu.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
