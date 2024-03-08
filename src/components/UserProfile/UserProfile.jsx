import "./UserProfile.css";
import { Inbox, LinkAlt, Plus } from "react-flaticons";
import { Link } from "react-router-dom";

function UserProfile() {
  return (
    <div className="user-profile">
      <div className="cover-photo">
        <img
          src="https://tse1.mm.bing.net/th?id=OIP.EAMmAuGOLue28tuteUi4cQHaCv&pid=Api&P=0&h=220"
          alt="cover-photo"
        />
      </div>

      <div className="user-info">
        <img src="../vite.svg" alt="profile-photo" />
        <div className="usre-name">
          <h3>Abdelrahman</h3>
        </div>
        <div className="profile-btns">
          <button className="btn btn-primary">
            Follow me
            <Plus />
          </button>
          <Link to={"/ChatBox/1"}>
            <button className="btn btn-primary">
              <Inbox />
            </button>
          </Link>
          <button className="btn">
            <LinkAlt />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
