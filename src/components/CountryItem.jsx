import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span className={styles.emoji}>{country.emoji}</span>
      <span className={styles.cityName}>{country.country}</span>
    </li>
  );
}

export default CountryItem;
