import { useEffect, useState } from "react";
import ChatboxMessage from "./ChatboxMessage";
import "./ChatboxMessages.css";
import { ArrowDown } from "react-flaticons";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { SERVER_URL } from "../../constants/server.constants";
import { useUser } from "../../providers/user.context";
import { useParams } from "react-router-dom";

// Components ---------------------------------------------------------------
function ChatboxMessages({ messages, setMessages, page, setPage }) {
  const { ref, inView } = useInView();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const { state: userState } = useUser();
  const { userAccessToken: AT, user: me } = userState;
  useEffect(() => {
    if (inView && !noMore) {
      console.log(page);
      setLoading(true);
      console.log("Inveiw");
      console.log(id);
      axios
        .get(
          `${SERVER_URL}message/conversationMessages/${id}?page=${page}&pageSize=${10}`,
          {
            headers: {
              Authorization: `Bearer ${AT}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.length === 0) setNoMore(true);
          else {
            setMessages((msgs) => [...msgs, ...res.data]);
            console.log(res.data);
            console.log([...messages, ...res.data]);
            setPage((pg) => pg + 1);
          }
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err);
          setLoading(false);
        });
    }
  }, [inView, page, noMore]);
  // console.log(messages);
  console.log(id);
  return (
    <div className="messages-container">
      {messages.length > 0 &&
        messages.map((msg, i) => {
          return <ChatboxMessage message={msg} key={i} />;
        })}
      <div className="fetch-ref" ref={ref}>
        {loading ? "loading..." : noMore && "You are on the top of chat"}
      </div>
    </div>
  );
}

export default ChatboxMessages;
