import { useState } from "react";
import "./Feeds.css";
// Icons......................................................................
import { Comment, Heart, MenuDotsVertical, Share } from "react-flaticons";
import { Link } from "react-router-dom";

// components..................................................................
import Comments from "../Comment/Comments";

// contexts ...................................................................
import { useUser } from "../../providers/user.context";
import { usePost } from "../../providers/post.context";

// actions......................................................................
import { DeletePost, UpdatePost } from "../../actions/post.actions";

function Feed({ post }) {
  const [comment, setComment] = useState(false);
  const [menu, setMenu] = useState(false);
  const [content, setContent] = useState("");
  const { state: userState } = useUser();
  const { dispatch } = usePost();
  const handleComment = () => {
    setComment((comm) => !comm);
  };
  const handleDeletePost = (e) => {
    e.preventDefault();
    DeletePost(dispatch, userState.userAccessToken, post.id);
  };
  const handleUpdatePost = (e) => {
    e.preventDefault();
    console.log(content);
    UpdatePost(dispatch, userState.userAccessToken, { content }, post.id);
  };
  return (
    <div className="feed-body">
      <div className="feed-header">
        <div className="user-header">
          <Link to={`/profile/:${post.userId}`}>
            <div className="user-data">
              <img src={post.user.image} alt="" />
              <h4>{post.user.name}</h4>
            </div>
          </Link>
          {userState.user.id === post.userId && (
            <div className="menu">
              <h5
                onClick={() => {
                  setMenu((men) => !men);
                }}
              >
                <MenuDotsVertical />
              </h5>
              {menu && (
                <div className="menu-data">
                  <h6 onClick={handleUpdatePost}>Update</h6>
                  <h6 onClick={handleDeletePost}>Delete</h6>
                </div>
              )}
            </div>
          )}
        </div>
        <h6>{post.created_at.split("T")[0]}</h6>
      </div>

      <div className="feed-mid">
        {userState.user.id === post.userId ? (
          <input
            type="text"
            placeholder={post.content}
            className="post-content"
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <p>{post.content}</p>
        )}
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
