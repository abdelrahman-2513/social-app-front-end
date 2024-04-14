import Loading from "../../assets/Loading/Loading";
import { usePost } from "../../providers/post.context";
import Feed from "./Feed";

function Feeds() {
  const { state } = usePost();
  const { posts } = state;
  return (
    <div className="feeds-container">
      {posts.length > 0 ? (
        posts.map((post, i) => {
          return <Feed key={i} post={post} />;
        })
      ) : (
        <h3 className="no-post">No posts yet!</h3>
      )}
    </div>
  );
}

export default Feeds;
