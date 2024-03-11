import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./assets/Layout/Layout";
import { UserProvider, useUser } from "./providers/user.context";
import { ToastContainer } from "react-toastify";
import Loading from "./assets/Loading/Loading";

function App() {
  return (
    <UserProvider>
      <ToastContainer />
      <Layout />
    </UserProvider>
  );
}

export default App;
