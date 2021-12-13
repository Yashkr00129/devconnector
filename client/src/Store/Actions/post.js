import axios from "axios";
import {setAlert} from "./alert";
import {postActions} from "../Reducers/post";
import store from "../store";

const {dispatch} = store;

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

// Add Like
export const addLike = async (postId) => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`);
        await dispatch(postActions.UPDATE_LIKES({id: postId, likes: res.data}));
    } catch (err) {
        dispatch(
            postActions.POST_ERROR({
                msg: err.response.statusText,
                status: err.response.status,
            })
        );
    }
};
// Add Like
export const removeLike = async (postId) => {
    try {
        const res = await axios.put(`api/posts/unlike/${postId}`);
        await dispatch(postActions.UPDATE_LIKES({id: postId, likes: res.data}));
    } catch (err) {
        dispatch(
            postActions.POST_ERROR({
                msg: err.response.statusText,
                status: err.response.status,
            })
        );
    }
};

// Delete Post
export const deletePost = async (id) => {
    try {
        await axios.delete(`/api/posts/${id}`);
        dispatch(postActions.DELETE_POST(id));
        await setAlert("Post Removed", "SUCCESS");
    } catch (err) {
        dispatch(
            postActions.POST_ERROR({
                msg: err.response.statusText,
                status: err.response.status,
            })
        );
    }
};

// Add Post
export const addPost = async (formData) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const res = await axios.post("api/posts", formData, config);
        await dispatch(postActions.ADD_POST(res.data));
    } catch (err) {
        dispatch(
            postActions.POST_ERROR({
                msg: err.response.statusText,
                status: err.response.status,
            })
        );
    }
};

// Get Post By Id
export const getPostById = async (id) => {
    try {
        const res = await axios.get(`/api/posts/${id}`);
        dispatch(postActions.GET_POST(res.data));
    } catch (err) {
        dispatch(
            postActions.POST_ERROR({
                msg: err.response.statusText,
                status: err.response.status,
            })
        );
    }
};

// Add Comment
export const addComment = async (postId, formData) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const res = await axios.post(
            `/api/posts/comment/${postId}`,
            formData,
            config
        );

        await dispatch(postActions.ADD_COMMENT(res.data));
    } catch (err) {
        dispatch(
            postActions.POST_ERROR({
                msg: err.response.statusText,
                status: err.response.status,
            })
        );
    }
};

// Add Comment
export const deleteComment = async (postId, commentId) => {
    try {
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        console.log(res.data)
        await dispatch(postActions.REMOVE_COMMENT(res.data));
    } catch (err) {
        dispatch(
            postActions.POST_ERROR({
                msg: err.response.statusText,
                status: err.response.status,
            })
        );
    }
};
