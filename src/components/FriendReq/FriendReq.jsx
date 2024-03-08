import { Link } from "react-router-dom";
import "./FriendReq.css";
function FriendReq() {
  const requests = [1, 2, 3, 4, 5];
  return (
    <div className="friend-requests">
      <h4>Friend Requests</h4>
      <div className="requests">
        {requests.map((req) => {
          return (
            <div className="request">
              <Link to={`/profile/${req}`}>
                <div className="user-info">
                  <img src="../vite.svg" alt="icon" />
                  <h5>{`user-${req}`}</h5>
                </div>
              </Link>
              <div className="btns">
                <button className="btn btn-primary">Confirm</button>
                <button className="btn btn-red">Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FriendReq;
