import axios from "axios";
import { setAlert } from "./alert";
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
