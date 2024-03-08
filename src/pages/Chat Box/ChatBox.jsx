import "./ChatBox.css";
import { ArrowAltRight, ArrowAltToTop, ArrowUp } from "react-flaticons";
import Stories from "../../components/Stories/Stories";

function ChatBox() {
  return (
    <>
      <Stories />
      <div className="chat-box">
        <div className="chat-box-top">
          <div className="chat-user-info">
            <img src="../vite.svg" alt="profile-photo" />
            <div className="user-name">
              <h3>User-name</h3>
            </div>
          </div>
          <button className=" btn-red">X</button>
        </div>
        <div className="chat-mid">
          <h4>Enter your message</h4>
        </div>
        <div className="chat-box-bottom">
          <form action="#">
            <input type="text" name="content" placeholder="Write Something" />
            <button className="btn btn- btn-primary">
              <ArrowUp />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
