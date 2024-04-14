import "./Message.css";
import { MessageCode, Search } from "react-flaticons";
import { Link } from "react-router-dom";
import { useUserFriend } from "../../providers/user.requests.friends";
import { useEffect } from "react";
import { useUser } from "../../providers/user.context";
import axios from "axios";
import { SERVER_URL } from "../../constants/server.constants";

function Message() {
  const { state: reqState } = useUserFriend();
  const { conversations } = reqState;
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
        {conversations.length > 0 ? (
          <>
            {conversations.map((conv, i) => {
              return (
                <Link to={`/ChatBox/${conv.id}`} key={i}>
                  <div className="message">
                    <img
                      src={
                        conv.participants[0].image === "unknown"
                          ? "/unknown.jpg"
                          : conv.participants[0].image
                      }
                      alt={`${conv.participants[0].name}-image`}
                    />
                    <div className="message-data">
                      <h5>{conv.participants[0].name}</h5>
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
