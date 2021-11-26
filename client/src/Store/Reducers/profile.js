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
      const newState = {
        ...state,
        currentUserProfile:action.payload,
        loading: false,
      };
      state = newState;
      return state;
    },
    PROFILE_ERROR(state, action) {
      const newState = {
        ...state,
        currentUserProfile: null,
        loading: false,
        error:action.payload
      };
      state = newState;
      return state;
    },
    GET_ALL_PROFILES(state, action) {
      const newState = {
        ...state,
        allProfiles: action.payload,
        loading: false,
      };
      state = newState;
      return state;
    },
    CLEAR_PROFILE(state, action) {
      const newState = {
        currentUserProfile: null,
        allProfiles: [],
        repos: [],
        loading: true,
        error: {},
      };
      state = newState;
      return state;
    },
  },
});

export default profileSlice.reducer;
export const profileActions = profileSlice.actions;
