import React, { useContext } from "react";
import './WeatherPage.css';
import { WeatherContext } from "../contexts/WeatherContext";

const SearchWeather = () => {

	const { setCity, searchCoordinates, weatherInfo } = useContext(WeatherContext);

	const handleSearchButton = () => {
		searchCoordinates();
	}

	return (
		<div className="weatherPage">
			<div className='mainBox'>
				<h1>City Weather</h1>
				<div className='searchBox'>
					<input
						name='search'
						onChange={(e) => setCity(e.target.value)}
						placeholder='search a city'
					></input>
					<button onClick={handleSearchButton}>Search</button>
				</div>
				<div className='resultBox'>
					{weatherInfo && weatherInfo.current ? (
						<p>Temperature: {weatherInfo.current.temperature_2m}{weatherInfo.current_units.temperature_2m}</p>
					) : (
						<p></p>
					)}
				</div>
			</div>
		</div>

	)
}

export default SearchWeather;
