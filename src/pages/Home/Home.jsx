// components ..........................................................................................................

import { useEffect } from "react";
import AddPost from "../../components/AddPost/AddPost";
import Feeds from "../../components/Feed/Feeds";
import Stories from "../../components/Stories/Stories";

// contexts .............................................................................................................
import { usePost } from "../../providers/post.context";
import { useUser } from "../../providers/user.context";
import { GetFeeds } from "../../actions/post.actions";
import Loading from "../../assets/Loading/Loading";

function Home() {
  const { state: userState } = useUser();
  const { state: postState, dispatch } = usePost();
  const { loading } = postState;

  useEffect(() => {
    GetFeeds(dispatch, userState.userAccessToken, postState.pageNumber);
  }, [userState.userAccessToken]);
  return (
    <>
      {loading ? (
        <Loading className={"inbox"} />
      ) : (
        <>
          <Stories />
          <AddPost />
          <Feeds />
        </>
      )}
    </>
  );
}

export default Home;
