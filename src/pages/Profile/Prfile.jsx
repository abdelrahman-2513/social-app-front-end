import "./Profile.css";
// components.......................
import AddPost from "../../components/AddPost/AddPost";
import Feeds from "../../components/Feed/Feeds";
import UserProfile from "../../components/UserProfile/UserProfile";
import { useEffect } from "react";
import { useUser } from "../../providers/user.context";
import { usePost } from "../../providers/post.context";
import { useParams } from "react-router-dom";
import { GetUserPosts } from "../../actions/post.actions";

function Profile() {
  const { state: userState } = useUser();
  const { dispatch } = usePost();
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    if (!id)
      GetUserPosts(dispatch, userState.userAccessToken, userState.user.id);
    else {
      GetUserPosts(dispatch, userState.userAccessToken, id);
    }
  }, [userState.userAccessToken, id]);
  return (
    <div className="profile">
      <UserProfile friend={Number(id)} />
      {!id && <AddPost />}
      <Feeds />
    </div>
  );
}

export default Profile;
