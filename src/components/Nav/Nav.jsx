import "./Nav.css";
import { Envelope, Home, Search, User } from "react-flaticons";
import { Link } from "react-router-dom";
import DarkMode from "../DarkMode/DarkMode";
import { useUser } from "../../providers/user.context";
import { useState } from "react";
import { SearchUsers } from "../../actions/user.actions";
import AddFriend from "../AddFriend/AddFriend";
import { toast } from "react-toastify";
import axios from "axios";

function Nav() {
  const { state, dispatch } = useUser();
  const [active, setActive] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:3000/user?name=${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${state.userAccessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSearchResult(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

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
          {active ? (
            <span className="close-icon" onClick={() => setActive(false)}>
              🔼
            </span>
          ) : (
            <Search />
          )}
          <input
            type="search"
            placeholder="search"
            onFocus={() => setActive(true)}
            onChange={handleSearch}
          />

          {active && (
            <div className="search-content">
              {searchResult.length > 0 ? (
                searchResult.map((friend, i) => {
                  return <AddFriend friend={friend} key={i} />;
                })
              ) : (
                <h6>No results!</h6>
              )}
            </div>
          )}
        </div>
        <div className="nav-right">
          <Link to="/ChatBox">
            <Envelope />
          </Link>
          <DarkMode />
          <div className="nav-user">
            <img
              src={
                state.user.image === "unknown"
                  ? "./unknown.jpg"
                  : state.user.image
              }
              alt={`${state.user.name}-image`}
            />
            <h4 className="user-name">{state.user.name}</h4>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
