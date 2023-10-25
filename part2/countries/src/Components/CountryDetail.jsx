import React from "react";
import WeatherInfo from "./WeatherInfo";

const CountryDetail = ({ country, searchTerm }) => {

	if (country && searchTerm) {
		return (
			<div>
				<h2>{country.name.common}</h2>
				<p>Capital: {country.capital}</p>
				<p>Area: {country.area} km²</p>
				<h3>Languages</h3>
				<ul>
					{Object.values(country.languages).map(
						(language, index) => (
							<li key={index}>
								{language}
							</li>
						)
					)}
				</ul>
				<img
					src={country.flags[1]}
					alt={country.name.common}
				/>
				<WeatherInfo capital={country.capital}/>
			</div>
		);
	}
};

export default CountryDetail;
