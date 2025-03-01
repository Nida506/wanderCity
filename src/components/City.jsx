import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect } from "react";
import { useCities } from "../contexts/CitiesContext";
import BackButton from "./BackButton";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );

  const { cityName, emoji, date, notes } = currentCity;
  console.log(isLoading, currentCity);
  if (isLoading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div>
        <h6>Cityname</h6>
        <p>
          <span className={styles.icon}>{emoji} </span> {cityName}
        </p>
      </div>

      <div>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div className={styles.btn}>
        {" "}
        <BackButton />
      </div>
    </div>
  );
}

export default City;
