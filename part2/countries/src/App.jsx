import SearchBar from "./Components/SearchBar";
import CountryList from "./Components/CountryList";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [countryList, setCountryList] = useState([]);



	useEffect(() => {
		if (searchTerm.trim() === "") {
			setCountryList([]);
			return;
		}

		axios.get(`https://restcountries.com/v3/name/${searchTerm}`)
			.then((response) => {
				console.log(
					"list of countries:",
					response.data
				);
				setCountryList(response.data);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
				setCountryList([]);
			});
	}, [searchTerm]);

	return (
		<div>
			<SearchBar
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
			/>
			<CountryList
				countryList={countryList}
				searchTerm={searchTerm}
			/>
		</div>
	);
};
export default App;
