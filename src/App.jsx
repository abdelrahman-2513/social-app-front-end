import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./assets/Layout/Layout";
import { UserProvider } from "./providers/user.context";
import { PostProvider } from "./providers/post.context";
import { ToastContainer } from "react-toastify";
import { UserRequestsProvider } from "./providers/user.requests.friends";

function App() {
  return (
    <UserProvider>
      <PostProvider>
        <UserRequestsProvider>

        <Layout />
        <ToastContainer />
        </UserRequestsProvider>
      </PostProvider>
    </UserProvider>
  );
}

export default App;
