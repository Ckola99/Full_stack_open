import { useState, useEffect } from "react";
import CountryDetail from "./CountryDetail";

const CountryList = ({ countryList, searchTerm }) => {
	const [selectedCountry, setSelectedCountry] = useState(null);

	const matchedCountries = countryList.filter((country) =>
		country.name.common
			.toLowerCase()
			.includes(searchTerm.toLowerCase())
	);

	const handleShowDetails = (country) => {
		setSelectedCountry(country);
	};

	useEffect(() => {
		if (searchTerm.trim() === "") {
			setSelectedCountry(null);
			return;
		}
	}, [searchTerm]);

	return (
		<div>
			{selectedCountry ? (
				<CountryDetail
					country={selectedCountry}
					searchTerm={searchTerm}
				/>
			) : matchedCountries.length < 10 &&
			  matchedCountries.length > 0 ? (
				<ul>
					{matchedCountries.map(
						(country, index) => (
							<li key={index}>
								{
									country
										.name
										.common
								}{" "}
								<button
									onClick={() =>
										handleShowDetails(
											country
										)
									}
								>
									Show
								</button>
							</li>
						)
					)}
				</ul>
			) : matchedCountries.length > 10 && searchTerm ? (
				<p>
					Too many matches, please specify your
					search.
				</p>
			) : searchTerm ? (
				<p>No corresponding country data found.</p>
			) : null}
		</div>
	);
};

export default CountryList;
