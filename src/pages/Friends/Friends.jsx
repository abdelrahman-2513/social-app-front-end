import "./friends.css";

// Providers--------------------------------------------------------------------------------------------------------
import { useUserFriend } from "../../providers/user.requests.friends";
// Components ------------------------------------------------------------------------------------------------------
import Friend from "./Friend";

function Friends() {
  const { state: reqState } = useUserFriend();
  const { friends } = reqState;
  return (
    <div className="friends-container">
      <div className="header">
        <h2>Your friends - {friends.length}</h2>
      </div>
      {friends.map((friend, id) => {
        return <Friend friend={friend} key={id} />;
      })}
    </div>
  );
}

export default Friends;
