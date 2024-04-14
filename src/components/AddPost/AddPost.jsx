import { useState } from "react";
import { usePost } from "../../providers/post.context";
import { useUser } from "../../providers/user.context";
import "./AddPost.css";
import { Film, Picture } from "react-flaticons";
import { toast } from "react-toastify";
import { CreatePost } from "../../actions/post.actions";
function AddPost() {
  const [postContent, setPostContent] = useState("");
  const { state: userState } = useUser();
  const { dispatch } = usePost();
  const handleCreatePost = (e) => {
    e.preventDefault();
    console.log(postContent);
    CreatePost(dispatch, userState.userAccessToken, { content: postContent });
  };

  return (
    <form className="post-form">
      <div className="form-top">
        <img
          src={
            userState.user.image === "unknown"
              ? "./unknown.jpg"
              : `${userState.user.image}`
          }
          alt={`${userState.user.name} profile-photo`}
        />

        <input
          type="text"
          placeholder="What in your mind?"
          onChange={(e) => setPostContent(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleCreatePost}>
          Post
        </button>
      </div>
      <div className="form-categories">
        <div className="photo">
          <input type="file" name="" id="fileType" />
          <label htmlFor="fileType">
            <Picture />
          </label>
        </div>
        <div className="vedio">
          <input type="file" name="" id="vedio" />
          <label htmlFor="vedio">
            <Film />
          </label>
        </div>
      </div>
    </form>
  );
}

export default AddPost;
