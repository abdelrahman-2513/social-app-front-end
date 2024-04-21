import "./ChatboxMessages.css";
import { useUser } from "../../providers/user.context";
function ChatboxMessage({ message }) {
  const { state } = useUser();
  const { user } = state;

  console.log(message);
  return (
    <div
      className={message.user.id === user.id ? "message my-message" : "message"}
    >
      <h3>{message.content}</h3>
      <h5>
        {new Date(message.created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </h5>
    </div>
  );
}

export default ChatboxMessage;
