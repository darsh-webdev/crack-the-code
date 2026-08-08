import { NavLink } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="title">Navbar</div>
      <div className="nav-links">
        <NavLink className="nav-item" to="/">
          Home
        </NavLink>

        <NavLink className="nav-item" to="/about">
          About
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
