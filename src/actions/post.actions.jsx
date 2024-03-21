import {
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  POST_REQUEST,
  UPDATE_POST,
} from "../constants/post.constants";
import axios from "axios";
import { SERVER_URL } from "../constants/server.constants";
import { toast } from "react-toastify";

// the function is used to get the user feeds
export const GetFeeds = (dispatch, accessToken, pageNumber) => {
  dispatch({ type: POST_REQUEST });
  axios
    .get(`${SERVER_URL}post/feeds?page=${pageNumber}&pageSize=10`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({ type: GET_POSTS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
    });
};

// the function is used to get custom user posts
export const GetUserPosts = (dispatch, accessToken, userId) => {
  dispatch({ type: POST_REQUEST });
  axios
    .get(`${SERVER_URL}post/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({ type: GET_POSTS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
    });
};

// the function is used to create a post

export const CreatePost = (dispatch, accessToken, postData) => {
  if (!postData.content) toast.warn("Cannot create empty post!");
  else {
    dispatch({ type: POST_REQUEST });
    axios
      .post(`${SERVER_URL}post/`, postData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: CREATE_POST, payload: res.data });
        toast.success("Post created!");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  }
};

// This function is used to update post
export const UpdatePost = (dispatch, accessToken, postData, postId) => {
  dispatch({ type: POST_REQUEST });
  axios
    .patch(`${SERVER_URL}post/${postId}`, postData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      toast.success("Post Updated!");
      dispatch({ type: UPDATE_POST, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
    });
};

// This function is used to delete post
export const DeletePost = (dispatch, accessToken, postId) => {
  dispatch({ type: POST_REQUEST });
  axios
    .delete(`${SERVER_URL}post/${postId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({ type: DELETE_POST, payload: postId });
      toast.warn("Post Deleted!");
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
    });
};
