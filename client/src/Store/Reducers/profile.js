import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    currentUserProfile: null,
    allProfiles: [],
    repos: [],
    loading: true,
    error: {},
  },
  reducers: {
    GET_PROFILE(state, action) {
      state.currentUserProfile = action.payload;
      state.loading = false;
    },
    PROFILE_ERROR(state, action) {
      state.currentUserProfile = null;
      state.loading = false;
      state.error = action.payload;
    },
    GET_ALL_PROFILES(state, action) {
      state.allProfiles = action.payload;
      state.loading = false;
    },
    CLEAR_PROFILE(state, action) {
      state.currentUserProfile = null;
      state.allProfiles = [];
      state.repos = [];
      state.error = {};
      state.loading = true;
    },
    UPDATE_PROFILE(state, action) {
      state.currentUserProfile = action.payload;
      state.loading = false;
    },
    GET_REPOS(state, action) {
      state.repos = action.payload;
    },
  },
});

export default profileSlice.reducer;
export const profileActions = profileSlice.actions;
