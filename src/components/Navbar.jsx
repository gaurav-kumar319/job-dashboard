import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 style={{ margin: 0 }}>Job Dashboard</h2>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/saved">Saved Jobs</Link>
      </div>
    </nav>
  );
}

export default Navbar;