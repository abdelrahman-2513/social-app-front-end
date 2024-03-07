import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import Loading from "../Loading/Loading";
import Home from "../../pages/Home/Home";
import LeftBar from "../../components/Left Bar/LeftBar";
import RightBar from "../../components/Right Bar/RightBar";
import Nav from "../../components/Nav/Nav";
import Profile from "../../pages/Profile/Prfile";
import ChatBox from "../../pages/Chat Box/ChatBox";

function Layout() {
  // feed-------------------------------
  const Feed = () => {
    return (
      <>
        <Nav />
        <main>
          <LeftBar />
          <div className="container">
            <Outlet />
          </div>
          <RightBar />
        </main>
      </>
    );
  };

  //  router----------------------------
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Feed />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/ChatBox",
          element: <ChatBox />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/signup",
      element: <Signup />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} fallbackElement={<Loading />} />
    </>
  );
}

export default Layout;
