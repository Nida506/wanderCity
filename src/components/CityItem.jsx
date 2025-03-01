import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";
// for formatting the date
const formatDate = (date) => {
  if (!date) return "Invalid date";
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

function CityItem({ city }) {
  // getting the current city and deleteCity function from the context APi
  const { currentCity, deleteCity } = useCities();

  // getting data from prop
  const { cityName, emoji, date, id, position } = city;

  // when click on delete button in the city list
  const deleteHandler = (e) => {
    e.preventDefault();
    deleteCity(id);
  };

  return (
    <div
      className={`
        ${styles.cityItem}
        ${id === currentCity.id ? styles["cityItem--active"] : ""}
      `}
    >
      <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <div>
          <div className={styles.cityLeft}>
            <span className={styles.emoji}>{emoji}</span>
            <span className={styles.cityName}>{cityName}</span>
          </div>
          <div className={styles.cityRight}>
            <span className={styles.date}>{formatDate(date)}</span>
            <button className={styles.btn} onClick={deleteHandler}>
              x
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CityItem;
