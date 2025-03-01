import CityItem from "./CityItem";
import styles from "./Cities.module.css";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";

function Cities() {
  const { cities, isLoading } = useCities();
  console.log(cities);
  if (isLoading) return <Spinner />;
  return (
    <div className={styles.cities}>
      <ul>
        {cities.map((city, index) => (
          <CityItem city={city} key={index} />
        ))}
      </ul>
    </div>
  );
}

export default Cities;
