import "./RigthBar.css";

// components .................................
import FriendReq from "../FriendReq/FriendReq";
import Message from "../Message/Message";

function RightBar() {
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
