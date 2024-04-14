// user actions type ...................................................
import {
  USER_ERROR,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REQUEST,
  USER_SIGNUP,
  USER_UPDATE_MYDATA,
  USER_SEARCH,
  USER_REQUESTS_LOADING,
  USER_FRIEND_REQUESTS,
  USER_SEARCH_LOADING,
  USER_ACCEPT_REQUEST,
  USER_REMOVE_FRIEND,
  USER_RESPONSE,
} from "../../constants/user.constants";

export const userReducer = (state, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return { ...state, loading: true, error: "" };
    case USER_REQUESTS_LOADING:
      return { ...state, loadingRequests: true };
    case USER_SEARCH_LOADING:
      return { ...state, loadingSearch: true };
    case USER_LOGIN:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        userAccessToken: action.payload.accessToken,
        userRefreshToken: action.payload.refreshToken,
        accessDate: action.payload.accessDate,
      };
    case USER_SIGNUP:
      return { ...state, loading: false };
    case USER_SEARCH:
      return { ...state, loadingSearch: false, navSearch: action.payload };
    case USER_RESPONSE:
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
        accessDate: Date.now() - 20000000,
        navSearch: [],
      };
    case USER_UPDATE_MYDATA:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    case USER_FRIEND_REQUESTS:
      return {
        ...state,
        loadingRequests: false,
        userRequests: action.payload,
      };
    case USER_ACCEPT_REQUEST:
      const acceptedReqId = action.payload;
      const remaningRequests = state.userRequests.toUser.filter(
        (req) => req.id !== acceptedReqId
      );
      return {
        ...state,
        loadingRequests: false,
        userRequests: remaningRequests,
      };
    case USER_REMOVE_FRIEND:
      return {
        ...state,
        loadingRequests: false,
        loading: false,
      };
    case USER_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
