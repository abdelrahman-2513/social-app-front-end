import "./RigthBar.css";

// components .................................
import FriendReq from "../FriendReq/FriendReq";
import Message from "../Message/Message";
import { useUser } from "../../providers/user.context";
import { useEffect } from "react";
import {
  getMyConversation,
  userFriendRequests2,
} from "../../actions/user.actions";
import { useUserFriend } from "../../providers/user.requests.friends";

function RightBar() {
  const { state: userState } = useUser();
  const { dispatch: requestsDispatch } = useUserFriend();

  useEffect(() => {
    if (userState.userAccessToken)
      userFriendRequests2(userState.userAccessToken, requestsDispatch);
    getMyConversation(requestsDispatch, userState.userAccessToken);
  }, [userState.userAccessToken, requestsDispatch]);
  return (
    <div className="RightBar">
      <div className="rightBar-container">
        <Message />
        <FriendReq />
      </div>
    </div>
  );
}

export default RightBar;
