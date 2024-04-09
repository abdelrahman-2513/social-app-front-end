import "./Message.css";
import { MessageCode, Search } from "react-flaticons";
import { Link } from "react-router-dom";
import { useUser } from "../../providers/user.context";
import { useUserFriend } from "../../providers/user.requests.friends";

function Message() {
  // const messages = [1, 2, 3, 4, 5];
  const { state: reqState } = useUserFriend();
  return (
    <div className="message-container">
      <div className="message-top">
        <h4>Message</h4>
        <MessageCode />
      </div>
      <div className="message-searchBar">
        <Search />
        <input type="search" placeholder="search message" />
      </div>
      <div className="border-div"></div>
      <div className="messages">
        {reqState.friends.length > 0 ? (
          <>
            {reqState.friends.map((friend, i) => {
              console.log(friend);
              return (
                <Link to={`/ChatBox/${friend.id}`} key={i}>
                  <div className="message">
                    <img
                      src={
                        friend.image === "unknown"
                          ? "./unknown.jpg"
                          : friend.image
                      }
                      alt={`${friend.name}-image`}
                    />
                    <div className="message-data">
                      <h5>{friend.name}</h5>
                      <p>Lets talk!</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </>
        ) : (
          <h6>No Conversations yet!</h6>
        )}
      </div>
    </div>
  );
}

export default Message;
