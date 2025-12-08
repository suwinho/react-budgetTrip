import Link from "next/link";
import styles from "./HotelCard.module.css";

export default function HotelCard({ hotel }) {
  if (!hotel.name) return null;

  return (
    <Link
      href={hotel.web_url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <div className={styles.imageContainer}>
        <img
          src={
            hotel.photo?.images?.large?.url ||
            "https://via.placeholder.com/300x200?text=Brak+Zdjecia"
          }
          alt={hotel.name}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{hotel.name}</h3>

        <div className={styles.info}>
          <span className={styles.rating}>⭐ {hotel.rating}</span>
          <span className={styles.reviews}>({hotel.num_reviews} opinii)</span>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>{hotel.price}</span>

          <span className={styles.fakeButton}>Zobacz ofertę &rarr;</span>
        </div>
      </div>
    </Link>
  );
}
