import "./AddPost.css";
import { Film, Picture } from "react-flaticons";
function AddPost() {
  return (
    <form className="post-form">
      <div className="form-top">
        <img src="./vite.svg" alt="userPhoto" />

        <input type="text" placeholder="What in your mind?" />
        <button className="btn btn-primary">Post</button>
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
