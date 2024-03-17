// user actions type ...................................................
import {
  USER_ERROR,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REQUEST,
  USER_SIGNUP,
  USER_UPDATE_MYDATA,
} from "../../constants/user.constants";

export const userReducer = (state, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return { ...state, loading: true, error: "" };
    case USER_LOGIN:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        userAccessToken: action.payload.accessToken,
        userRefreshToken: action.payload.refreshToken,
      };
    case USER_SIGNUP:
      return { ...state, loading: false };
    case USER_LOGOUT:
      return {
        ...state,
        loading: false,
        user: null,
        isAuthenticated: false,
        userAccessToken: "",
        userRefreshToken: "",
        error: "",
      };
    case USER_UPDATE_MYDATA:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    case USER_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
