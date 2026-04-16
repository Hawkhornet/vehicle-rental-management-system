import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthButton = () => {
    if (user) {
      logout();
      navigate("/");
      return;
    }

    navigate("/login", { state: { from: location } });
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        valo<span>rent.lk</span>
      </Link>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/marketplace">Marketplace</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/my-listings">My Listings</Link>
      </nav>

      <div className="navbar-right">
        {user && <span className="welcome-text">Hi, {user.name}</span>}
        <button className="login-button" onClick={handleAuthButton}>
          {user ? "Logout" : "Login"}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
