import "./Profile.css";
// components.......................
import AddPost from "../../components/AddPost/AddPost";
import Feeds from "../../components/Feed/Feeds";
import UserProfile from "../../components/UserProfile/UserProfile";

function Profile() {
  return (
    <div className="profile">
      <UserProfile />
      <AddPost />
      <Feeds />
    </div>
  );
}

export default Profile;
