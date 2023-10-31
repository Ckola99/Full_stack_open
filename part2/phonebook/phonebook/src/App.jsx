import { useState, useEffect } from "react";
import axios from "axios";
import SearchFilter from "./Components/SearchFilter";
import Form from "./Components/Form";
import List from "./Components/List";
import personService from "./services/personService";
import Notification from "./Components/Notification";
import "./index.css"

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchTerm, setSearchTerm] = useState(""); // New state for search term
	const [notification, setNotification] = useState(null)

	// Use an Effect hook to fetch initial data from the server
	useEffect(() => {
		 personService.getList().then((initialPersons) => {
				setPersons(initialPersons);
			});
	}, []); // The empty dependency array ensures this effect runs only once

	const addName = (event) => {
		event.preventDefault();
		// Convert newName and existing names to lowercase for case-insensitive comparison
		const newNameLowercase = newName.toLowerCase();
		const existingPerson = persons.find(
			(person) =>
				person.name.toLowerCase() === newNameLowercase
		);

		if (existingPerson) {
			if (
				window.confirm(
					`${newName} is already in the phonebook. Do you want to update the number?`
				)
			) {
				const updatedPerson = {
					...existingPerson,
					number: newNumber,
				};
				axios.put(
					`http://localhost:3001/api/persons/${existingPerson.id}`,
					updatedPerson
				)
					.then((response) => {
						setPersons(
							persons.map((person) =>
								person.id ===
								existingPerson.id
									? response.data
									: person
							)
						);
						setNewName("");
						setNewNumber("");
						showNotification(
							"success", `Successfully updated ${newName}`
						);
					})
					.catch((error) => {
						showNotification(
							"error",
							`${newName}'s information has already been removed from the server.`
						);
						console.error(
							"Error updating person:",
							error
						);
					});
			}
		} else {
			// If the person doesn't exist, add them as a new entry
			const newPerson = {
				name: newName,
				number: newNumber,
			};

			axios.post("http://localhost:3001/api/persons", newPerson)
				.then((response) => {
					// Update the local state with the new person
					setPersons([...persons, response.data]);
					setNewName("");
					setNewNumber("");
					showNotification("success", `Added ${newName}.`);
				})
				.catch((error) => {
					showNotification("error", error.response.data.error);
					console.error("Error adding person:", error);
				});
		}
	};

	const removePerson = (id, name) => {
		if(window.confirm(`Delete ${name}?`)) {
			personService.remove(id, persons, setPersons, showNotification);
			showNotification("success", `Deleted ${name}.`)
		}else{
			console.log("Deletion canceled.")
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

	 const showNotification = (type, message) => {
			setNotification({ type, message });
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification notification={notification} />
			<SearchFilter
				searchTerm={searchTerm}
				handleSearchBar={handleSearchBar}
			/>
			<h2> Add a New </h2>
			<Form
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				addName={addName}
			/>
			<List filteredPersons={filteredPersons} removePerson={removePerson}/>
		</div>
	);
};

export default App;
