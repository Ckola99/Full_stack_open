import { useState } from "react";
import SearchFilter from "./Components/SearchFilter";
import Form from "./Components/Form";
import List from "./Components/List";

const App = () => {
	const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-12434567" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchTerm, setSearchTerm] = useState(""); // New state for search term

	const addName = (event) => {
		event.preventDefault();
		// Convert newName and existing names to lowercase for case-insensitive comparison
		const newNameLowercase = newName.toLowerCase();
		const isDuplicate = persons.some(
			(person) =>
				person.name.toLowerCase() === newNameLowercase
		);

		if (isDuplicate) {
			alert("Name already exists in the phonebook.");
		} else {
			// If not a duplicate, add the name to the phonebook
			setPersons([
				...persons,
				{ name: newName, number: newNumber },
			]);
			setNewName("");
			setNewNumber("");
		}
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleSearchBar = (event) => {
		setSearchTerm(event.target.value); // Update search term state
	};

	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<h2>Phonebook</h2>
			<SearchFilter
				searchTerm={ searchTerm }
				handleSearchBar={ handleSearchBar }
			/>
			<h2> Add a New </h2>
			<Form
				newName={ newName }
				newNumber={ newNumber }
				handleNameChange={ handleNameChange }
				handleNumberChange={ handleNumberChange }
				addName={ addName }
			/>
			<List filteredPersons={ filteredPersons }/>
		</div>
	);
};

export default App;
