import axios from "axios";
const baseUrl = "/api/persons";

const getList = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const remove = ( id, persons, setPersons, showNotification ) => {
	return axios
		.delete(`http://localhost:3001/api/persons/${id}`)
		.then(() => {
			// Remove the deleted person from the local state
			setPersons(persons.filter((person) => person.id !== id));
		})
		.catch((error) => {
			showNotification("error", `Error deleting contact.`);
			console.error("Error deleting:", error);
		});
}

export default {
	getList, // Export the getList function
	remove,
};
