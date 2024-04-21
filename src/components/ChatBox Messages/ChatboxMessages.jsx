import ChatboxMessage from "./ChatboxMessage";
import "./ChatboxMessages.css";

// Components ---------------------------------------------------------------
function ChatboxMessages({ messages }) {
  console.log(messages);
  return (
    <div className="messages-container">
      {messages.length > 0 &&
        messages.map((msg, i) => {
          return <ChatboxMessage message={msg} key={i} />;
        })}
    </div>
  );
}

export default ChatboxMessages;
