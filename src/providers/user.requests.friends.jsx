import React, { createContext, useContext, useReducer, useEffect } from "react";
import { userRequestsReducer } from "../reducers/user reducer/user.data.reducer";

// Define your initial state
const initialState = {
  error: "",
  loading: false,
  friendRequestsToUser: [],
  friendRequestsFromUser: [],
  friends: [],
};

// Create a context for your user state
const RequestsContext = createContext();

// UserProvider component to provide user context to its children
export function UserRequestsProvider({ children }) {
  const [state, dispatch] = useReducer(userRequestsReducer, initialState);

  return (
    <RequestsContext.Provider value={{ state, dispatch }}>
      {children}
    </RequestsContext.Provider>
  );
}

// Custom hook to consume user context
export const useUserFriend = () => {
  return useContext(RequestsContext);
};
