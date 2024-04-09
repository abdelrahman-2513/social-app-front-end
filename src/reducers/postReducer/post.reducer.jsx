import {
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  POST_REQUEST,
  UPDATE_POST,
} from "../../constants/post.constants";

export const postReducer = (state, action) => {
  switch (action.type) {
    case POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        // pageNumber: state.pageNumber + 1,
        loading: false,
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false,
      };
    case UPDATE_POST:
      const editedPost = action.payload;
      const updatedPosts = state.posts.map((post) =>
        post.id === editedPost.id ? editedPost : post
      );
      return {
        ...state,
        loading: false,
        posts: updatedPosts,
      };
    case DELETE_POST:
      const deletedPostId = action.payload;
      const remainingPosts = state.posts.filter(
        (post) => post.id !== deletedPostId
      );
      return {
        ...state,
        posts: remainingPosts,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
  }
};
