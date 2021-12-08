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
  },
});

export default postSlice.reducer;
export const postActions = postSlice.actions;
