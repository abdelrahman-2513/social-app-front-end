import { useParams } from "react-router-dom";
import "./NewChat.css";
import { useUser } from "../../providers/user.context";

function NewChat({ message, socket }) {
  const { id } = useParams();
  const { state: userState } = useUser();
  const handleSendSavedMessages = (e) => {
    e.preventDefault();
    const payload = {
      content: message.substr(4),
      userId: userState.user.id,
      convId: id,
    };
    console.log(payload);
    socket.emit("sendMessage", JSON.stringify(payload));
  };
  return (
    <div className="small-message" onClick={handleSendSavedMessages}>
      <h5>{message}</h5>
    </div>
  );
}

export default NewChat;
