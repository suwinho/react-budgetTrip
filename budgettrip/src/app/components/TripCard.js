import Link from "next/link";
import styles from "./MyTrips.module.css";

export default function TripCard({ trip }) {
  return (
    <li className={styles.card}>
      <div>
        <h3 className={styles.cardTitle}>
          {trip.hotelName} ({trip.city})
        </h3>
        <p className={styles.cardMeta}>
          Data: {trip.date} | Status: <strong>{trip.status}</strong>
        </p>
      </div>

      <div className={styles.cardRight}>
        <div className={styles.price}>{trip.price} zł</div>

        <Link href={`/trip/${trip.id}`} className={styles.detailsLink}>
          Szczegóły &rarr;
        </Link>
      </div>
    </li>
  );
}
