import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useReducer,
} from "react";

const CitiesContext = createContext();

// Backend API URL
const url = "http://localhost:8000";

// Initial state for the reducer
const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: "",
};

// Reducer function to manage state
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

// Provider component for CitiesContext
const CitiesProvider = ({ children }) => {
  const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Fetch all cities data on component mount
  useEffect(() => {
    async function getData() {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${url}/cities`);
        console.log(response);
        if (!response.ok) throw new Error("Failed to fetch cities");
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "😉 Error in loading all cities",
        });
      }
    }

    getData();
  }, []);

  // Fetch a single city's details
  const getCity = useCallback(
    async (id) => {
      if (+id === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${url}/cities/${id}`);
        if (!response.ok) throw new Error("Failed to fetch city details");
        const data = await response.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "😉 Error in fetching city details",
        });
      }
    },
    [currentCity.id]
  );

  // Create a new city and add it to the state
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${url}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to create city");
      const data = await response.json();
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected", // ✅ Fixed incorrect key
        payload: "😉 Error in creating the city",
      });
    }
  }

  // Delete a city from the API and update state
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${url}/cities/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete city");
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({
        type: "rejected", // ✅ Fixed incorrect key
        payload: "😉 Error in deleting the city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        isLoading,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

// Custom hook to use the Cities context
function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error("Cities context must be used within CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
