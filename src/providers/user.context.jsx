// import { createContext, useContext, useReducer } from "react";
// import {
//   USER_LOGIN,
//   USER_REQUEST,
//   USER_SIGNUP,
//   USER_ERROR,
// } from "../constants/user.constants";
// import { toast } from "react-toastify";
// import axios from "axios";

// // The initial state to be used with the reducer

// const initialState = {
//   user: null,
//   userAccessToken: "",
//   userRefreshToken: "",
//   isAuthenticated: false,
//   error: "",
//   loading: false,
// };

// const userContext = createContext();

// // the reducer function
// const reducer = (state, action) => {
//   switch (action.type) {
//     case USER_REQUEST:
//       return { ...state, loading: true };
//     case USER_LOGIN:
//       return {
//         ...state,
//         loading: false,
//         isAuthenticated: true,
//         user: action.payload.user,
//         userAccessToken: action.payload.accessToken,
//         userRefreshToken: action.payload.refreshToken,
//       };
//     case USER_SIGNUP:
//       return { ...state, loading: false };
//     case USER_ERROR:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export function UserProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <userContext.Provider value={{ state, dispatch }}>
//       {children}
//     </userContext.Provider>
//   );
// }
import React, { createContext, useContext, useReducer, useEffect } from "react";

// Define your action types
const USER_REQUEST = "USER_REQUEST";
const USER_LOGIN = "USER_LOGIN";
const USER_SIGNUP = "USER_SIGNUP";
const USER_ERROR = "USER_ERROR";

// Define your initial state
const initialState = {
  user: null,
  userAccessToken: "",
  userRefreshToken: "",
  isAuthenticated: false,
  error: "",
  loading: false,
};

// Create a context for your user state
const userContext = createContext();

// Reducer function to manage state updates
const reducer = (state, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return { ...state, loading: true };
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
    case USER_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// UserProvider component to provide user context to its children
export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const storedState = localStorage.getItem("userState");
    return storedState ? JSON.parse(storedState) : initialState;
  });

  // Effect to save state to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem("userState", JSON.stringify(state));
  }, [state]);

  return (
    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  );
}

// Custom hook to consume user context
export const useUser = () => {
  return useContext(userContext);
};
