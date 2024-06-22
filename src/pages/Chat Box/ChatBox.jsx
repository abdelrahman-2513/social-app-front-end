import "./ChatBox.css";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link, useParams } from "react-router-dom";
import { ArrowDown, ArrowUp } from "react-flaticons";
import axios from "axios";
import io from "socket.io-client";
// Components ---------------------------------------------------------------------------
import Stories from "../../components/Stories/Stories";
import Loading from "../../assets/Loading/Loading";

// Providers -----------------------------------------------------------------------------
import { useUserFriend } from "../../providers/user.requests.friends";
import { useUser } from "../../providers/user.context";

// Constants -----------------------------------------------------------------------------
import { SERVER_URL } from "../../constants/server.constants";
import { toast } from "react-toastify";
import ChatboxMessages from "../../components/ChatBox Messages/ChatboxMessages";
import NewChat from "../../components/NewChatMessage/NewChat";
import AddMessage from "../../components/AddMessage/AddMessage";
const socket = io("http://localhost:3000");

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [chatData, setChatData] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const { state: reqState, dispatch: reqDispatch } = useUserFriend();
  const { state: userState, dispatch } = useUser();
  const { conversations } = reqState;
  const { userAccessToken: AT, user: me } = userState;

  useEffect(() => {
    if (messages.length === 0) {
      setLoading(true);
      axios
        .get(
          `${SERVER_URL}message/conversationMessages/${id}?page=${1}&pageSize=${10}`,
          {
            headers: {
              Authorization: `Bearer ${AT}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setMessages(res.data);
          setLoading(false);
          setPage((pg) => (pg === 1 ? pg + 1 : pg));
        })
        .catch((err) => {
          toast.error(err);
          setLoading(false);
        });
      conversations.forEach((conv) => {
        if (conv.id == id) {
          setChatData(conv);
        }
      });
      setLoading(false);
    }
  }, [id, AT, conversations, chatData, messages]);
  useEffect(() => {
    console.log("from useEffect");
    socket.on("connect", () => {
      console.log("from webSocket");
    });
    socket.emit("joinConversation", `${id}`);

    return () => {
      // socket.off("newMessage");
      socket.emit("leaveConversation", `${id}`);
    };
  }, [id]);
  useEffect(() => {
    console.log("from hearing message");

    socket.on("newMessage", (message) => {
      console.log(message);
      setMessages((prevMessages) => [message, ...prevMessages]);
    });

    // Clean up event listener
    return () => {
      socket.off("newMessage");
    };
  }, []);

  return (
    <>
      <Stories />
      {!loading ? (
        <div className="chat-box">
          <div className="chat-box-top">
            {chatData.hasOwnProperty("participants") && (
              <Link to={`/profile/${chatData.participants[0].id}`}>
                <div className="chat-user-info">
                  <img
                    src={
                      chatData.participants[0].image === "unknown"
                        ? "/unknown.jpg"
                        : chatData.participants[0].image
                    }
                    alt={`${chatData.participants[0].name}-image`}
                  />
                  <div className="user-name">
                    <h3>{chatData.participants[0].name}</h3>
                  </div>
                </div>
              </Link>
            )}
            <Link to={"/"}>
              <button className=" btn-soft">Close</button>
            </Link>
          </div>
          <div className="chat-mid">
            <>
              {messages.length > 0 ? (
                <ChatboxMessages
                  messages={messages}
                  setMessages={setMessages}
                  page={page}
                  setPage={setPage}
                />
              ) : (
                <div className="helper-messages">
                  <NewChat message={"Say Hello 👋"} socket={socket} />
                  <NewChat message={"Say How are you?"} socket={socket} />
                </div>
              )}
            </>
          </div>
          <div className="chat-box-bottom">
            <AddMessage socket={socket} />
          </div>
        </div>
      ) : (
        <Loading loading={loading} />
      )}
    </>
  );
}

export default ChatBox;
