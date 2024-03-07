import AddPost from "../../components/AddPost/AddPost";
import Feeds from "../../components/Feed/Feeds";
import Stories from "../../components/Stories/Stories";

function Home() {
  return (
    <>
      <Stories />
      <AddPost />
      <Feeds />
    </>
  );
}

export default Home;
