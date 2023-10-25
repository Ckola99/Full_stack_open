import { useEffect, useState } from "react";
import axios from "axios";

const WeatherInfo = ({ capital }) => {
	const [weather, setWeather] = useState(null);
	const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

	useEffect(() => {
		if (capital) {
			axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`
			)
				.then((response) => {
					console.log(response.data)
					setWeather(response.data);
				})
				.catch((error) => {
					console.error(
						"error fetching weather data:",
						error
					);
					setWeather({ error: true }); // Set an error flag in case of error
				});
		}
	}, [capital, apiKey]);

	//Define a function to get the weather icon URL
	const getWeatherIconUrl = () => {
		if (!weather) {
			return null;
		}

		if (weather.weather.length > 0) {
			const iconCode = weather.weather[0].icon;
			return `https://openweathermap.org/img/wn/${iconCode}.png`;
		}
	}

	// Conditional rendering
	if (!weather) {
		// Return loading state or any message you like
		return <div>Loading weather information...</div>;
	}

	if (weather.error) {
		// Error state
		return <div>Error fetching weather information</div>;
	}

	const weatherIconUrl = getWeatherIconUrl();

	return (
		<div>
			<h2>Weather in {capital}</h2>
			<p>Temperature: {weather.main.temp}°C</p>
			<img
				src={weatherIconUrl}
				alt="Weather Icon"
				width="85"
				height="75"
			/>
			<p>Humidity: {weather.main.humidity}%</p>
			<p>Weather: {weather.weather[0].description}</p>
		</div>
	);
};
export default WeatherInfo;
