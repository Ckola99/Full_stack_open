const SearchFilter = ({ searchTerm, handleSearchBar }) => {
	return (
		<div>
			filter shown with
			<input value={searchTerm} onChange={handleSearchBar} />
		</div>
	);
};

export default SearchFilter;
