"use client";

import { useState } from "react";
import { useHotelContext } from "@/app/context/HotelContext";
import ReviewForm from "@/app/components/ReviewForm";
import styles from "./style.module.css";

export default function TripEditorPage() {
  const { currentTrip, removeAttraction, addAttraction } = useHotelContext();
  const [newAttr, setNewAttr] = useState("");
  const [reviews, setReviews] = useState([
    {
      id: 1,
      username: "Jan Kowalski",
      rating: "5",
      comment: "Świetny plan wycieczki! Wszystko dopięte na ostatni guzik.",
      date: new Date().toLocaleDateString(),
    },
  ]);

  const handleReviewSubmit = (reviewData) => {
    const newReview = {
      ...reviewData,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
    };
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  const renderStars = (count) => "★".repeat(count) + "☆".repeat(5 - count);

  if (!currentTrip) {
    return (
      <div className={styles.noData}>
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
    <main className={styles.container}>
      <div className={styles.hotelInfo}>
        <h1 className={styles.hotelName}>
          Planujesz pobyt w: {currentTrip.hotel.name}
        </h1>
        <p className={styles.hotelPrice}>
          Cena hotelu: {currentTrip.hotel.price}
        </p>
      </div>

      <h2>Twoja lista atrakcji (Edycja)</h2>

      <form onSubmit={handleAdd} className={styles.form}>
        <input
          type="text"
          placeholder="Wpisz nazwę własnej atrakcji..."
          value={newAttr}
          onChange={(e) => setNewAttr(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.addButton}>
          + Dodaj
        </button>
      </form>

      <ul className={styles.list}>
        {currentTrip.attractions.map((attr, index) => (
          <li key={index} className={styles.listItem}>
            <div className={styles.itemContent}>
              {attr.photo && (
                <img
                  src={attr.photo}
                  alt={attr.name}
                  className={styles.itemImage}
                />
              )}
              <div>
                <strong>{attr.name}</strong>
                <div className={styles.itemRanking}>{attr.ranking}</div>
              </div>
            </div>

            <button
              onClick={() => removeAttraction(index)}
              className={styles.removeButton}
            >
              Usuń 🗑️
            </button>
          </li>
        ))}
      </ul>

      {currentTrip.attractions.length === 0 && (
        <p className={styles.emptyMessage}>
          Twoja lista jest pusta. Dodaj coś!
        </p>
      )}
      <hr className={styles.divider} />

      <div className={styles.reviewsContainer}>
        <ReviewForm onReviewSubmit={handleReviewSubmit} />

        <div className={styles.reviewsList}>
          <h3>Opinie użytkowników ({reviews.length})</h3>

          {reviews.length === 0 ? (
            <p className={styles.noReviews}>Brak opinii. Bądź pierwszy!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewUser}>{review.username}</span>
                  <span className={styles.reviewDate}>{review.date}</span>
                </div>
                <div className={styles.reviewStars}>
                  {renderStars(Number(review.rating))}
                </div>
                <p className={styles.reviewComment}>{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
