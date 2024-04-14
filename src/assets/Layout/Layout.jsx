import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { Suspense, useEffect } from "react"; // Changed from useState to Suspense
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import Loading from "../Loading/Loading";
import Home from "../../pages/Home/Home";
import LeftBar from "../../components/Left Bar/LeftBar";
import RightBar from "../../components/Right Bar/RightBar";
import Nav from "../../components/Nav/Nav";
import Profile from "../../pages/Profile/Prfile";
import ChatBox from "../../pages/Chat Box/ChatBox";
import { useUser } from "../../providers/user.context";
import PageNotFound from "../../pages/Page Not Found/PageNotFound";
import Settings from "../../pages/Settings/Settings";
import { Logout } from "../../actions/user.actions";
import Friends from "../../pages/Friends/Friends";

function Layout() {
  const { state } = useUser();

  // feed-------------------------------
  const Feed = () => {
    return (
      <>
        {state["loading"] ? (
          <Loading />
        ) : (
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
        )}
      </>
    );
  };

  const ProtectedRoute = ({ element }) => {
    const { state, dispatch } = useUser();

    useEffect(() => {
      if (Date.now() - 18000000 >= state.accessDate) Logout(dispatch);
    }, [state.accessDate]);
    return state.isAuthenticated ? element : <Navigate replace to="/login" />;
  };

  const routes = [
    {
      path: "/",
      element: <ProtectedRoute element={<Feed />} />,
      children: [
        { path: "/", element: <ProtectedRoute element={<Home />} /> },
        { path: "/profile", element: <ProtectedRoute element={<Profile />} /> },
        {
          path: "/profile/:id",
          element: <ProtectedRoute element={<Profile />} />,
        },
        { path: "/ChatBox", element: <ProtectedRoute element={<ChatBox />} /> },
        {
          path: "/ChatBox/:id",
          element: <ProtectedRoute element={<ChatBox />} />,
        },
        {
          path: "/mySettings",
          element: <ProtectedRoute element={<Settings />} />,
        },
        {
          path: "/friends",
          element: <ProtectedRoute element={<Friends />} />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    { path: "/signup", element: <Signup /> },
    { path: "*", element: <PageNotFound /> }, // Wildcard route for 404 errors
  ];

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={createBrowserRouter(routes)} />
    </Suspense>
  );
}

export default Layout;
