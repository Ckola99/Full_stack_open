import React from "react";

const SearchBar = ({searchTerm, setSearchTerm}) => {

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	return (
		<div>
			Find Countries:{" "}
			<input
				type="text"
				value={searchTerm}
				onChange={handleSearchChange}
			/>
		</div>
	);
};
export default SearchBar;
