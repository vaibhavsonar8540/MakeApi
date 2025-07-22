
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/about" style={styles.link}>About</Link>
      <Link to="/signup" style={styles.link}>Sign Up</Link>
      <Link to="/login" style={styles.link}>Login</Link>
      {username && <span style={styles.user}>Hi, {username}</span>}
    {username && <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>}

    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem 2rem",
    background: "#1a5ea7",
    color: "#fff"
  },
  link: {
    textDecoration: "none",
    fontWeight: "bold",
    color: "#fff"
  },
  user: {
    marginLeft: "auto",
    fontWeight: "bold",
    color: "#fff"
  },
  logoutButton: {
  background: "#ff4d4d",
  border: "none",
  color: "#fff",
  padding: "0.5rem 1rem",
  borderRadius: "6px",
  cursor: "pointer"
}

};


export default Navbar;
