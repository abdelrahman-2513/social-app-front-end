import axios from "axios";
import { useUser } from "../../providers/user.context";
import "./Addfriend.css";

import { Link } from "react-router-dom";
import { SERVER_URL } from "../../constants/server.constants";
import { toast } from "react-toastify";
import {
  cancelRequest,
  removeFriend,
  sendRequest,
} from "../../actions/user.actions";
import { useUserFriend } from "../../providers/user.requests.friends";

function AddFriend({ friend }) {
  const { state, dispatch } = useUser();
  const { state: userFriendsState, dispatch: reqDispatch } = useUserFriend();
  const { friendRequestsToUser, friendRequestsFromUser, friends } =
    userFriendsState;
  const { user, userAccessToken } = state;
  console.log(friendRequestsFromUser);
  const handleAddFriend = (e) => {
    e.preventDefault();
    sendRequest(userAccessToken, reqDispatch, user.id, friend.id);
  };
  const handleCancelRequest = (e) => {
    e.preventDefault();
    cancelRequest(state.userAccessToken, reqDispatch, friend.id);
  };
  const handleRemoveFriend = (friendID) => {
    console.log(friendID);
    removeFriend(userAccessToken, dispatch, friendID);
  };
  const handleAcceptRequest = (friend) => {
    console.log(friend);
  };
  return (
    <div className="user-card">
      <Link to={`/profile/${friend.id}`}>
        <div className="user-info">
          <img
            src={friend.image === "unknown" ? "/unknown.jpg" : friend.image}
            alt={`${friend.name}-profile-image`}
          />
          <h5>{friend.name}</h5>
        </div>
      </Link>
      <div className="btns">
        {friendRequestsFromUser.length > 0 &&
        friendRequestsFromUser.some(
          (request) => request.toUserId === friend.id
        ) ? (
          <button className="btn btn-soft" onClick={handleCancelRequest}>
            Cancel
          </button>
        ) : friends.some((person) => person.id === friend.id) ? (
          <button
            className="btn btn-red"
            onClick={() => handleRemoveFriend(friend.id)}
          >
            Delete friend
          </button>
        ) : friendRequestsToUser.some(
            (request) => request.fromUserId === friend.id
          ) ? (
          <button
            className="btn btn-primary"
            onClick={() => handleAcceptRequest(friend)}
          >
            Accept
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleAddFriend}>
            Add friend
          </button>
        )}
      </div>
    </div>
  );
}

export default AddFriend;
