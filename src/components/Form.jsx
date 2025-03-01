import Button from "./Button";
import BackButton from "./BackButton";
import styles from "./Form.module.css";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [country, setCountry] = useState("");
  const [notes, setNotes] = useState("");

  const { isLoading, createCity } = useCities();
  const navigate = useNavigate();
  console.log();
  // getting data of current location where you click on map (latitude and longitude)  from the custom hook useUrlPostion which get that data from url
  const [lat, lng] = useUrlPosition();

  // getting data of that lat , lng city
  useEffect(() => {
    async function getCityData() {
      if (!lat && !lng) return;
      try {
        setIsFormLoading(true);
        setErrorMsg(false);
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();
        console.log(data);
        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );

        setCityName(data.city || data.locality || "");
        setEmoji(convertToEmoji(data.countryCode));
        setCountry(data.countryName);
      } catch (e) {
        setErrorMsg(e.message);
      } finally {
        setIsFormLoading(false);
      }
    }
    getCityData();
  }, [lat, lng]);

  async function submitHandler(e) {
    e.preventDefault();
    if (!cityName || !startDate) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date: startDate,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isFormLoading) return <Spinner />;
  if (errorMsg) return <ErrorMessage message={errorMsg} />;
  if (!lat && !lng)
    return <ErrorMessage message="Start by clicking on the map 😉" />;
  return (
    <div className={`${styles.form} ${isLoading ? styles.loading : ""}`}>
      <form action="" onSubmit={submitHandler}>
        <div className={styles.row}>
          <label htmlFor="">City name</label>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <span className={styles.flag}>{emoji}</span>
        </div>

        <div>
          <label htmlFor="date">When did you go to?</label>
          <DatePicker
            id="date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div>
          <label htmlFor="">Notes about your trip to</label>
          <textarea
            type="text"
            input={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div
          className={`${styles.buttons} ${isLoading ? styles.loadingBtn : ""}`}
        >
          <Button type="primary">Add</Button>
          <BackButton />
        </div>
      </form>
    </div>
  );
}

export default Form;
