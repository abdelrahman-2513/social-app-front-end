import {
  ChartArea,
  ChatArrowDown,
  Film,
  Inbox,
  MessageCode,
  Picture,
  Settings,
  Text,
  TextCheck,
  Users,
} from "react-flaticons";
import { Link } from "react-router-dom";
import "./LeftBar.css";

const userData = {
  name: "Abdelrahman",
  image: "./vite.svg",
};
function LeftBar() {
  return (
    <div className="left-bar">
      <div className="leftBar-container">
        <div className="menu">
          <Link to="/profile">
            <div className="leftBar-user">
              <img src={userData.image} alt="icon" />
              <h4>{userData.name}</h4>
            </div>
          </Link>
          <Link to="/friends">
            <div className="nav-item">
              <Users />
              <h4>Friends</h4>
            </div>
          </Link>
          <Link to="/friends">
            <div className="nav-item">
              <Users />
              <h4>Friends</h4>
            </div>
          </Link>
          <Link to="/friends">
            <div className="nav-item">
              <Users />
              <h4>Friends</h4>
            </div>
          </Link>
          <Link to="/friends">
            <div className="nav-item">
              <Users />
              <h4>Friends</h4>
            </div>
          </Link>
        </div>
        <hr />
        <div className="menu">
          <h4 className="others">Your Shortcuts</h4>
          <Link to="/myPhotos">
            <div className="nav-item">
              <Picture />
              <h4>Photos</h4>
            </div>
          </Link>
          <Link to="/myVedios">
            <div className="nav-item">
              <Film />
              <h4>Vedios</h4>
            </div>
          </Link>
          <Link to="/myVedios">
            <div className="nav-item">
              <Text />
              <h4>Message</h4>
            </div>
          </Link>
          <Link to="/mySettings">
            <div className="nav-item">
              <Settings />
              <h4>Settings</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LeftBar;
