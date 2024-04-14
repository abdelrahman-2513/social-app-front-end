import {
  ChartArea,
  ChatArrowDown,
  Film,
  Inbox,
  MessageCode,
  PeoplePoll,
  Picture,
  Settings,
  Text,
  TextCheck,
  Users,
} from "react-flaticons";
import { Link } from "react-router-dom";
import "./LeftBar.css";
import { useUser } from "../../providers/user.context";
import { useUserFriend } from "../../providers/user.requests.friends";
import { useEffect } from "react";
import { getUserFriends } from "../../actions/user.actions";

function LeftBar() {
  const { state } = useUser();
  const { dispatch: reqDispatch } = useUserFriend();
  useEffect(() => {
    if (state.userAccessToken)
      getUserFriends(state.userAccessToken, reqDispatch);
  }, [state.userAccessToken]);
  return (
    <div className="left-bar">
      <div className="leftBar-container">
        <div className="menu">
          <Link to="/profile">
            <div className="leftBar-user">
              <img
                src={
                  state.user.image === "unknown"
                    ? "./unknown.jpg"
                    : state.user.image
                }
                alt={`${state.user.name}-image`}
              />
              <h4>{state.user.name}</h4>
            </div>
          </Link>
          <Link to="/friends">
            <div className="nav-item">
              <Users />
              <h4>Friends</h4>
            </div>
          </Link>
          <Link to="/groups">
            <div className="nav-item">
              <PeoplePoll />
              <h4>Groups</h4>
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
