import TripCard from "./TripCard";
import styles from "./MyTrips.module.css";

export default function TripList({ trips }) {
  if (trips.length === 0) {
    return (
      <p className={styles.emptyMessage}>
        Brak wycieczek spełniających kryteria.
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </ul>
  );
}
