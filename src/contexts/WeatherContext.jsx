import { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

// Create context
const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {

	// Variables
	const [city, setCity] = useState("");
	const [coordinatesObject, setCoordinatesObject] = useState([]);
	const [weatherInfo, setWeatherInfo] = useState([]);

	// If coordinates exist then get weather info
	useEffect(() => {
		getWeatherInfo();
	}, [coordinatesObject])

	// DEBUG:
	//useEffect(() => {
	//	console.log(weatherInfo);
	//}, [weatherInfo])

	// Get coordinates to a city
	const searchCoordinates = async () => {
		if (!city) return;
		setCoordinatesObject([]);

		// Api address for coordinates
		const address = `https://geocode.maps.co/search?q=${city}&api_key=${import.meta.env.VITE_GEOCODE_API_KEY}`;

		try {
			const response = await axios.get(address);
			setCoordinatesObject(response.data);
			setCity("");
		} catch (error) {
			console.error('Catched Error: Fetching coordinates data...', error);
		}
	}

	// Get weather information
	const getWeatherInfo = async () => {
		if (coordinatesObject.length === 0) {
			console.log("No city coordinates!");
			return;
		}

		const lat = coordinatesObject[0].lat;
		const lon = coordinatesObject[0].lon;

		// Api address for weather info
		const address = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`;

		try {
			const response = await axios.get(address);
			setWeatherInfo(response.data);
		} catch (error) {
			console.error("Catched Error: Fetching weather data...")
		}
	}

	return (
		<WeatherContext.Provider value={{
			searchCoordinates,
			setCity,
			weatherInfo,
		}}>
			{children}
		</WeatherContext.Provider>
	)
}



export { WeatherContext, WeatherProvider };
