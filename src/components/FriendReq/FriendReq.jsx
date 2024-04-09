import { Link } from "react-router-dom";
import "./FriendReq.css";
import { useUser } from "../../providers/user.context";
import Loading from "../../assets/Loading/Loading";
import {
  deleteRecievedRequest,
  userAcceptRequest,
} from "../../actions/user.actions";
import { useUserFriend } from "../../providers/user.requests.friends";
function FriendReq() {
  const { state } = useUser();
  const { state: requestState, dispatch: requestsDispatch } = useUserFriend();
  const { userAccessToken } = state;
  const { loading: loadingRequests, friendRequestsToUser } = requestState;

  const acceptRequest = (reqId) => {
    console.log(reqId, userAccessToken);
    userAcceptRequest(userAccessToken, requestsDispatch, reqId);
  };
  const deleteRequest = (reqId) => {
    console.log(reqId);
    deleteRecievedRequest(userAccessToken, requestsDispatch, reqId);
  };
  return (
    <div className="friend-requests">
      <h4>Friend Requests</h4>
      {loadingRequests ? (
        <Loading loading={loadingRequests} />
      ) : (
        <div className="requests">
          {friendRequestsToUser && friendRequestsToUser.length > 0 ? (
            <>
              {friendRequestsToUser.map((req, i) => {
                if (!req.accepted)
                  return (
                    <div className="request" key={i}>
                      <Link to={`/profile/${req.fromUserId}`}>
                        <div className="user-info">
                          <img src="../vite.svg" alt="icon" />
                          <h5>{req.fromUser.name}</h5>
                        </div>
                      </Link>
                      <div className="btns">
                        <button
                          className="btn btn-primary"
                          onClick={() => acceptRequest(req.id)}
                        >
                          Confirm
                        </button>
                        <button
                          className="btn btn-red"
                          onClick={() => deleteRequest(req.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                else return <></>;
              })}
            </>
          ) : (
            <h6>No requests yet!</h6>
          )}
        </div>
      )}
    </div>
  );
}

export default FriendReq;
