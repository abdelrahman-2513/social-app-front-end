import React, { createContext, useContext, useReducer, useEffect } from "react";

// reducers .........................................................................
import { userReducer } from "../reducers/user reducer/userReducer";

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

// UserProvider component to provide user context to its children
export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState, () => {
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
