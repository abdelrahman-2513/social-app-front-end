import axios from "axios";
import {
  USER_ERROR,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REQUEST,
  USER_SIGNUP,
  USER_UPDATE_MYDATA,
} from "../constants/user.constants";
import { toast } from "react-toastify";

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
