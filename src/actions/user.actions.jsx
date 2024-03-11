import axios from "axios";
import {
  USER_ERROR,
  USER_LOGIN,
  USER_REQUEST,
  USER_SIGNUP,
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
          refreshToken: res.data["refresh-token"],
          accessToken: res.data["access-token"],
        },
      });
      toast.success("Logged in successed!");
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: USER_ERROR, payload: "Cannot Login!" });
      toast.error("Cannot Login!");
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
      toast.error("Cannot Signup!");
    });
};
