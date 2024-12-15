import './WeatherApp.css'
// Pages
import SearchWeather from './pages/WeatherPage';

// Contexts
import { WeatherProvider } from './contexts/WeatherContext';

function WeatherApp() {

	return (
		<>
			<WeatherProvider>
				<SearchWeather></SearchWeather>
			</WeatherProvider>

		</>
	)
}

export default WeatherApp
