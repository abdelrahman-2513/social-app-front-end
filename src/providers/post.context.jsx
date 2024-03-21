import { createContext, useContext, useReducer } from "react";
import { postReducer } from "../reducers/postReducer/post.reducer";

const initialState = {
  posts: [],
  loading: false,
  error: "",
  pageNumber: 1,
};

//create context for post state
const postContext = createContext();

// create provider for the consumers of postContext

export function PostProvider({ children }) {
  const [state, dispatch] = useReducer(postReducer, initialState);

  return (
    <postContext.Provider value={{ state, dispatch }}>
      {children}
    </postContext.Provider>
  );
}

//create custom hook for using post context
export const usePost = () => {
  return useContext(postContext);
};
