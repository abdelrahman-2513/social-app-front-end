import { useState } from "react";
import "./Feeds.css";
import { Comment, Heart, Share } from "react-flaticons";
import { Link } from "react-router-dom";
import Comments from "../Comment/Comments";
function Feed() {
  const [comment, setComment] = useState(false);
  const handleComment = () => {
    setComment((comm) => !comm);
  };
  return (
    <div className="feed-body">
      <Link to="/profile/:id">
        <div className="feed-header">
          <img src="./vite.svg" alt="" />
          <h4>User</h4>
        </div>
      </Link>
      <div className="feed-mid">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora,
          quas ex accusamus quo fuga est officia, vitae eligendi harum porro
          veniam nemo saepe dicta nam, labore laborum facere laboriosam a?
        </p>
      </div>
      <div className="feed-footer">
        <div className="icon">
          <Heart />
        </div>
        <div className="icon" onClick={handleComment}>
          <Comment />
        </div>
        <div className="icon">
          <Share />
        </div>
      </div>
      {comment && <Comments />}
    </div>
  );
}

export default Feed;
