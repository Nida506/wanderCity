import styles from "./Countries.module.css";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner";

function Countries() {
  const { cities, isLoading } = useCities();
  console.log(cities);
  console.log(isLoading);
  if (isLoading) return <Spinner />;
  const countries = cities.reduce((accumulator, currentCity) => {
    if (
      !accumulator
        .map((element) => element.country)
        .includes(currentCity.country)
    ) {
      return [
        ...accumulator,
        { country: currentCity.country, emoji: currentCity.emoji },
      ];
    } else return accumulator;
  }, []);

  return (
    <div className={styles.countries}>
      <div>
        <ul>
          {countries.map((country) => (
            <CountryItem country={country} key={country.country} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Countries;
