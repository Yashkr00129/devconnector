import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    post: null,
    loading: true,
    error: {},
  },
  reducers: {
    GET_POSTS(state, action) {
      state.posts = action.payload;
      state.loading = false;
    },
    POST_ERROR(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    UPDATE_LIKES(state, action) {
      state.posts = state.posts.map((post) =>
        post._id === action.payload.id
          ? { ...post, likes: action.payload.likes }
          : post
      );
      state.loading = false;
    },
    DELETE_POST(state, action) {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.loading = false;
    },
    ADD_POST(state, action) {
      state.posts.unshift(action.payload);
      state.loading = false;
    },
    GET_POST(state, action) {
      state.post = action.payload;
      state.loading = false;
    },
  },
});

export default postSlice.reducer;
export const postActions = postSlice.actions;
