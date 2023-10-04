const List = ({ filteredPersons, removePerson }) => {
	return (
		<div>
			<h2>Numbers</h2>
			<ul>
				{filteredPersons.map((person, index) => (
					<li key={index}>
						{person.name} {person.number}
						<button onClick={() => removePerson(person.id, person.name)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default List;
