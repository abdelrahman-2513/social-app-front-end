import "./Nav.css";
import { Envelope, Home, Search, User } from "react-flaticons";
import { Link } from "react-router-dom";
import DarkMode from "../DarkMode/DarkMode";

function Nav() {
  return (
    <nav>
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/">
            <h3 className="logo">Social App</h3>
          </Link>
          <Link to="/">
            <Home />
          </Link>
          <Link to="/profile">
            <User />
          </Link>
        </div>
        <div className="nav-searchBar">
          <Search />
          <input type="search" placeholder="search" />
        </div>
        <div className="nav-right">
          <Link to="/ChatBox">
            <Envelope />
          </Link>
          <DarkMode />
          <div className="nav-user">
            <img src="./vite.svg" alt="icon" />
            <h4 className="user-name">Abdelrahman</h4>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
