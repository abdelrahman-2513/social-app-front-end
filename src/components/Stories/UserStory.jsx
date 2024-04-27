import { Plus } from "react-flaticons";
import "./Stories.css";

function UserStory() {
  return (
    <div className="story userStory">
      <div className="user">
        <img src="/vite.svg" alt={`user`} />
      </div>
      {/* <img src={stor} alt="story-data" /> */}
      <label htmlFor="storyFiles">
        <Plus />
      </label>
      <input type="file" id="storyFiles" />
      <h4>Add story</h4>
    </div>
  );
}

export default UserStory;
