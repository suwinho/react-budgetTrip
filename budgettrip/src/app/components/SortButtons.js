"use client";

import styles from "./SortButtons.module.css";

export default function SortButtons({ activeSort, onSortChange }) {
  const getButtonClass = (type) => {
    return activeSort === type
      ? `${styles.button} ${styles.active}`
      : styles.button;
  };

  return (
    <div className={styles.container}>
      <p className={styles.label}>Sortuj według:</p>

      <button
        className={getButtonClass("domyslne")}
        onClick={() => onSortChange("domyslne")}
      >
        Polecane
      </button>

      <button
        className={getButtonClass("cena_rosnaco")}
        onClick={() => onSortChange("cena_rosnaco")}
      >
        Najtańsze
      </button>

      <button
        className={getButtonClass("cena_malejaco")}
        onClick={() => onSortChange("cena_malejaco")}
      >
        Najdroższe
      </button>

      <button
        className={getButtonClass("ocena_malejaco")}
        onClick={() => onSortChange("ocena_malejaco")}
      >
        Najlepiej oceniane
      </button>
    </div>
  );
}
