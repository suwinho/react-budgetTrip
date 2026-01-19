import styles from "./MyTrips.module.css";

export default function TripFilters({
  filterText,
  setFilterText,
  filterStatus,
  setFilterStatus,
  showHighPriceOnly,
  setShowHighPriceOnly,
  sortType,
  setSortType,
}) {
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filterGroup}>
        <label className={styles.label}>Szukaj:</label>
        <input
          type="text"
          placeholder="Nazwa hotelu lub miasto..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={styles.select}
        >
          <option value="all">Wszystkie</option>
          <option value="planned">Zaplanowane</option>
          <option value="completed">Zakończone</option>
          <option value="cancelled">Anulowane</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={showHighPriceOnly}
            onChange={(e) => setShowHighPriceOnly(e.target.checked)}
          />
          Tylko drogie {">"} 1000 zł
        </label>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Sortuj:</label>
        <div className={styles.sortButtons}>
          <button
            className={`${styles.sortBtn} ${sortType === "price" ? styles.active : ""}`}
            onClick={() => setSortType("price")}
          >
            Wg Ceny
          </button>
          <button
            className={`${styles.sortBtn} ${sortType === "name" ? styles.active : ""}`}
            onClick={() => setSortType("name")}
          >
            Alfabetycznie
          </button>
          <button
            className={`${styles.sortBtn} ${sortType === "date" ? styles.active : ""}`}
            onClick={() => setSortType("date")}
          >
            Wg Daty
          </button>
        </div>
      </div>
    </div>
  );
}
