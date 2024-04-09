import axios from "axios";
import {
  USER_ACCEPT_REQUEST,
  USER_ERROR,
  USER_FRIENDS,
  USER_FRIEND_REQUESTS,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REMOVE_FRIEND,
  USER_REMOVE_REQUEST,
  USER_REMOVE_SEND_REQUEST,
  USER_REQUEST,
  USER_REQUESTS_LOADING,
  USER_SEARCH,
  USER_SEARCH_LOADING,
  USER_SEND_REQUEST,
  USER_SIGNUP,
  USER_UPDATE_MYDATA,
} from "../constants/user.constants";
import { toast } from "react-toastify";
import { SERVER_URL } from "../constants/server.constants";

/**
 * This function is used to sign in user
 * @param user:{email,password}
 * return loggedInUserData
 */
export const SignIn = (user, dispatch) => {
  dispatch({ type: USER_REQUEST });
  axios
    .post("http://localhost:3000/auth/login", user)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: USER_LOGIN,
        payload: {
          user: res.data.user,
          refreshToken: res.data.refresh_token,
          accessToken: res.data.access_token,
          accessDate: Date.now(),
        },
      });
      toast.success("Logged in successed!");
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: USER_ERROR, payload: "Cannot Login!" });
      toast.error(err.response.data.message);
    });
};

/**
 * This function is used for Signup
 * @Param newUser:{email:string,name:string,gender:string,age:number,role:"user"}
 * return successd
 */
export const SignUp = (user, dispatch) => {
  dispatch({ type: USER_REQUEST });
  axios
    .post("http://localhost:3000/auth/signup", user)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: USER_SIGNUP,
      });
      toast.success("Done Please login!");
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: USER_ERROR, payload: "Cannot signup!" });
      toast.error(err.response.data.message);
    });
};

/**
 * This funciton is used to logout the user
 * return done!
 */
export const Logout = (dispatch) => {
  dispatch({ type: USER_REQUEST });
  setTimeout(() => dispatch({ type: USER_LOGOUT }), 2000);
};

/**
 * This function is used to update user data
 * @param userData:{name:string,age?:number,image?:file}
 * return updated user
 */

export const UpdateMe = async (userData, accessToken, dispatch) => {
  dispatch({ type: USER_REQUEST });
  axios
    .post("http://localhost:3000/auth/updateMe", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: USER_UPDATE_MYDATA,
        payload: { user: res.data },
      });
      toast.success("Updated Successfully!");
    })
    .catch((err) => {
      dispatch({ type: USER_ERROR, payload: err.message });
      toast.error(err.response.data.message);
    });
};
/**
 * This function is used to update user password
 * @param userData:{currentPassword:string,newPassword?:string,confirmPassword?:string}
 * return loggingout
 */

export const UpdatePassword = async (userData, accessToken, dispatch) => {
  dispatch({ type: USER_REQUEST });
  axios
    .post("http://localhost:3000/auth/updatePassword", userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: USER_LOGOUT,
      });
      toast.success("Updated Successfully!");
    })
    .catch((err) => {
      dispatch({ type: USER_ERROR, payload: err.message });
      toast.error(err.response.data.message);
    });
};

/**
 * This function is used to search for users
 * @param accessToken
 * @Param searchQuery
 * returns reponse data
 */

export const SearchUsers = (name, accessToken, dispatch) => {
  dispatch({ type: USER_SEARCH_LOADING });
  axios
    .get(`http://localhost:3000/user?name=${name}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: USER_SEARCH,
      });
      return res.data;
    })
    .catch((err) => {
      dispatch({ type: USER_ERROR, payload: err.message });
      toast.error(err.response.data.message);
    });
};
/**
 * This function is used to get user Friends
 * @param {*} accessToken
 * @param {*} dispatch
 */
export const getUserFriends = (accessToken, dispatch) => {
  dispatch({ type: USER_REQUEST });
  axios
    .get(`${SERVER_URL}user/friends`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: USER_FRIENDS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: USER_ERROR, payload: err.message });
      toast.error(err.response.data.message);
    });
};
/**
 * This function is used to send frien request
 * @param {*} accessToken
 * @param {*} dispatch
 */
export const sendRequest = (accessToken, dispatch, fromId, toId) => {
  dispatch({ type: USER_REQUEST });
  axios
    .post(
      `${SERVER_URL}request/`,
      { fromUserId: fromId, toUserId: toId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: USER_SEND_REQUEST,
        payload: { fromUserId: fromId, toUserId: toId },
      });
      toast.success("Request sent!");
    })
    .catch((err) => {
      console.log(err);
    });
};
/**
 * This function is used to cancel friend request
 * @param {*} accessToken
 * @param {*} dispatch
 */
export const cancelRequest = (accessToken, dispatch, friendId) => {
  dispatch({ type: USER_REQUEST });
  axios
    .post(
      `${SERVER_URL}request/removeFriend/${friendId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => {
      console.log(res.data);
      dispatch({ type: USER_REMOVE_SEND_REQUEST, payload: friendId });
      toast.success("Request removed!");
    })
    .catch((err) => {
      console.log(err);
    });
};
/**
 * This function is used to delete friend request
 * @param {*} accessToken
 * @param {*} dispatch
 */
export const deleteRecievedRequest = (accessToken, dispatch, reqId) => {
  dispatch({ type: USER_REQUEST });
  axios
    .delete(
      `${SERVER_URL}request/${reqId}`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => {
      console.log(res.data);
      dispatch({ type: USER_REMOVE_REQUEST, payload: reqId });
      toast.success("Request deleted!");
    })
    .catch((err) => {
      console.log(err);
    });
};
/**
 * This function is used to get all the user requests
 * @param {*} accessToken
 * @param {*} dispatch
 */
export const userFriendRequests2 = (accessToken, dispatch) => {
  dispatch({ type: USER_REQUEST });
  axios
    .get(`http://localhost:3000/request/myRequest`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: USER_FRIEND_REQUESTS,
        payload: { fromUser: res.data.fromUser, toUser: res.data.toUser },
      });
    })
    .catch((err) => {
      dispatch({ type: USER_ERROR, payload: err.message });
      toast.error(err.response.data.message);
    });
};
/**
 * This function is used to accept the friend request
 * @param {*} accessToken
 * @param {*} dispatch
 * @param {*} reqId
 */
export const userAcceptRequest = (accessToken, dispatch, reqId) => {
  dispatch({ type: USER_REQUEST });
  axios
    .post(
      `http://localhost:3000/request/acceptRequest/${reqId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: USER_ACCEPT_REQUEST,
        payload: reqId,
      });
    })
    .catch((err) => {
      dispatch({ type: USER_ERROR, payload: err.message });
      toast.error(err.response.data.message);
    });
};
/**
 * This function is used to remove friend
 * @param {*} accessToken
 * @param {*} dispatch
 * @param {*} friendId
 */
export const removeFriend = (accessToken, dispatch, friendId) => {
  dispatch({ type: USER_REQUEST });
  axios
    .post(
      `http://localhost:3000/request/removeFriend/${friendId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: USER_REMOVE_FRIEND,
        payload: friendId,
      });
    })
    .catch((err) => {
      dispatch({ type: USER_ERROR, payload: err.message });
      toast.error(err.response.data.message);
    });
};
