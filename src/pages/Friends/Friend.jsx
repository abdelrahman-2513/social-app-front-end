import { Link } from "react-router-dom";
import { useUser } from "../../providers/user.context";
import { removeFriend } from "../../actions/user.actions";

function Friend({ friend }) {
  const { state: userState, dispatch } = useUser();
  const { userAccessToken: At } = userState;

  const handleRemoveFriend = () => {
    removeFriend(At, dispatch, friend.id);
  };
  return (
    <div className="friend-container">
      <Link to={`/profile/${friend.id}`}>
        <div className="friend-data">
          <img
            src={
              friend.image === "unknown" ? "./unknown.jpg" : `${friend.image}`
            }
            alt={`${friend.name} profile-photo`}
          />
          <h5>{friend.name}</h5>
        </div>
      </Link>
      <button className="btn btn-red" onClick={handleRemoveFriend}>
        {" "}
        Remove Friend
      </button>
    </div>
  );
}

export default Friend;
