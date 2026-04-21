import { useContext } from "react";
import { JobsContext } from "../context/JobsContext";

function SearchBar() {
  const { searchQuery, setSearchQuery } = useContext(JobsContext);

  return (
    <input
      type="text"
      placeholder="Search jobs..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{
        padding: "10px",
        width: "100%",
        marginBottom: "20px",
      }}
    />
  );
}

export default SearchBar;