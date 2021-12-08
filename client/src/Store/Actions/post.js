import axios from "axios";
// import { setAlert } from "./alert";
import { postActions } from "../Reducers/post";
import store from "../store";
const { dispatch } = store;

// Get Posts
export const getPosts = async () => {
  try {
    const res = await axios.get("/api/posts");
    dispatch(postActions.GET_POSTS(res.data));
  } catch (err) {
    dispatch(
      postActions.POST_ERROR({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Like Posts
export const likePost = async (postId) => {
  try {
    const res = await axios.put(`api/posts/like/${postId}`);
    await dispatch(postActions.UPDATE_LIKES({ id: postId, likes: res.data }));
  } catch (err) {
    dispatch(
      postActions.POST_ERROR({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};
// Unlike Posts
export const unlikePost = async (postId) => {
  try {
    const res = await axios.put(`api/posts/unlike/${postId}`);
    await dispatch(postActions.UPDATE_LIKES({ id: postId, likes: res.data }));
  } catch (err) {
    dispatch(
      postActions.POST_ERROR({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Dislike Post
export const dislikePost = async (postId) => {
  try {
    const res = await axios.put(`api/posts/dislike/${postId}`);
    await dispatch(
      postActions.UPDATE_DISLIKES({ id: postId, dislikes: res.data })
    );
  } catch (err) {
    dispatch(
      postActions.POST_ERROR({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};
// unDislike Post
export const unDislikePost = async (postId) => {
  try {
    const res = await axios.put(`api/posts/undislike/${postId}`);
    await dispatch(
      postActions.UPDATE_DISLIKES({ id: postId, dislikes: res.data })
    );
  } catch (err) {
    dispatch(
      postActions.POST_ERROR({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};
