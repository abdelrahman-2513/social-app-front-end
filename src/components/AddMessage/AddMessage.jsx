import { useState } from "react";
import { useUser } from "../../providers/user.context";
import { ArrowUp } from "react-flaticons";
import { useParams } from "react-router-dom";

function AddMessage({ socket }) {
  const { state: userState, dispatch } = useUser();
  const { id } = useParams();
  const [content, setContent] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(content);
    const payload = {
      content: content,
      userId: userState.user.id,
      convId: id,
    };
    console.log(payload);
    socket.emit("sendMessage", JSON.stringify(payload));
    setContent("");
  };
  return (
    <form action="#">
      <input
        type="text"
        name="content"
        value={content}
        placeholder="Write Something"
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="btn btn- btn-primary"
        onClick={handleSendMessage}
        disabled={!content}
      >
        <ArrowUp />
      </button>
    </form>
  );
}

export default AddMessage;
