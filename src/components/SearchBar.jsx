function SearchBar({ setQuery }) {
  return (
    <input
      type="text"
      placeholder="Search jobs..."
      onChange={(e) => setQuery(e.target.value)}
      style={{
        padding: "10px",
        width: "100%",
        marginBottom: "20px",
      }}
    />
  );
}

export default SearchBar;