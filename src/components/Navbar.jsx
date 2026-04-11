import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>Job Dashboard</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/saved" style={{ marginLeft: "10px" }}>
          Saved Jobs
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "#222",
    color: "white",
  },
};

export default Navbar;