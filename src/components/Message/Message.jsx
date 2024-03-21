import "./Message.css";
import { MessageCode, Search } from "react-flaticons";
import { Link } from "react-router-dom";

function Message() {
  const messages = [1, 2, 3, 4, 5];
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
        {messages.map((msg, i) => {
          return (
            <Link to={`/ChatBox/${msg}`} key={i}>
              <div className="message">
                <img src="./vite.svg" alt="icon" />
                <div className="message-data">
                  <h5>{`user-${msg}`}</h5>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.{" "}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Message;
