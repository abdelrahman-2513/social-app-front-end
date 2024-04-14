import "./UserProfile.css";
import { Inbox, LinkAlt, Plus } from "react-flaticons";
import { Link } from "react-router-dom";
import { useUser } from "../../providers/user.context";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../assets/Loading/Loading";
import { toast } from "react-toastify";
import { useUserFriend } from "../../providers/user.requests.friends";
import {
  cancelRequest,
  removeFriend,
  sendRequest,
} from "../../actions/user.actions";
import CopyToClipboard from "react-copy-to-clipboard";
import ImagePreview from "../ImagePreview/imagePreview";
function UserProfile({ friend }) {
  const [user, setUser] = useState({});
  const [loading, setloading] = useState(false);
  const { state, dispatch } = useUser();
  const { state: reqState, dispatch: reqDispatch } = useUserFriend();
  const { friends, friendRequestsFromUser, friendRequestsToUser } = reqState;
  const { user: me, userAccessToken } = state;

  const handleAddFriend = (e) => {
    e.preventDefault();
    sendRequest(userAccessToken, reqDispatch, me.id, friend);
  };
  const handleRemoveFriend = (e) => {
    e.preventDefault();
    removeFriend(userAccessToken, dispatch, friend);
  };
  const handleCancelRequest = (e) => {
    e.preventDefault();
    cancelRequest(state.userAccessToken, reqDispatch, friend);
  };
  const copyLink = (e) => {
    // e.preventDefault();
    toast.success("Copied To Clipboard");
  };
  useEffect(() => {
    setloading(true);
    if (friend) {
      axios
        .get(`http://localhost:3000/user/${friend}`, {
          headers: {
            Authorization: `Bearer ${userAccessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);

          setUser(res.data);
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    }
    setloading(false);
  }, [userAccessToken, friend]);
  return (
    <>
      {!loading ? (
        <div className="user-profile">
          <div className="cover-photo">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.EAMmAuGOLue28tuteUi4cQHaCv&pid=Api&P=0&h=220"
              alt="cover-photo"
            />
          </div>

          <div className="user-info">
            {friend ? (
              <>
                <ImagePreview
                  imageUrl={
                    user.image === "unknown" ? "/unknown.jpg" : user.image
                  }
                />
                <div className="usre-name">
                  <h3>{user.name}</h3>
                </div>
              </>
            ) : (
              <>
                <ImagePreview
                  imageUrl={me.image === "unknown" ? "/unknown.jpg" : me.image}
                />
                <div className="usre-name">
                  <h3>{me.name}</h3>
                </div>
              </>
            )}
            <div className="profile-btns">
              {friend ? (
                <>
                  {friends.some((person) => person.id === user.id) ? (
                    <button
                      className="btn btn-red"
                      onClick={handleRemoveFriend}
                    >
                      Remove Friend
                    </button>
                  ) : friendRequestsFromUser.length > 0 &&
                    friendRequestsFromUser.some(
                      (request) => request.toUserId === user.id
                    ) ? (
                    <button
                      className="btn btn-soft"
                      onClick={handleCancelRequest}
                    >
                      Cancel
                    </button>
                  ) : friendRequestsToUser.some(
                      (request) => request.fromUserId === friend.id
                    ) ? (
                    <button
                      className="btn btn-primary"
                      // onClick={() => handleAcceptRequest(friend)}
                    >
                      Accept
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={handleAddFriend}
                    >
                      Add
                      <Plus />
                    </button>
                  )}
                  <CopyToClipboard
                    text={window.location.href}
                    onCopy={copyLink}
                  >
                    <button className="btn">
                      <LinkAlt />
                    </button>
                  </CopyToClipboard>
                </>
              ) : (
                <button className="btn" onClick={copyLink}>
                  <LinkAlt />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loading loading={loading} />
      )}
    </>
  );
}

export default UserProfile;
