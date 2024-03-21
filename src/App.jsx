import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./assets/Layout/Layout";
import { UserProvider, useUser } from "./providers/user.context";
import { ToastContainer } from "react-toastify";
import Loading from "./assets/Loading/Loading";
import { PostProvider } from "./providers/post.context";

function App() {
  return (
    <UserProvider>
      <PostProvider>
        <Layout />
        <ToastContainer />
      </PostProvider>
    </UserProvider>
  );
}

export default App;
