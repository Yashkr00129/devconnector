import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
  },
  reducers: {
    REGISTER_SUCCESS(state, action) {
      localStorage.setItem("token", action.payload.token);
      const newState = {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
      state = newState;
      return state;
    },
    REGISTER_FAIL(state, action) {
      localStorage.removeItem("token");
      const newState = {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
      state = newState;
      return state;
    },
    USER_LOADED(state, action) {
      const newState = {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
      state = newState;
      return state;
    },
    AUTH_ERROR(state, action) {
      localStorage.removeItem("token");
      const newState = {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
      state = newState;
      return state;
    },
    LOGIN_SUCCESS(state, action) {
      localStorage.setItem("token", action.payload.token);
      const newState = {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
      state = newState;
      return state;
    },
    LOGIN_FAIL(state, action) {
      localStorage.removeItem("token");
      const newState = {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
      state = newState;
      return state;
    },
    LOG_OUT(state, action) {
      localStorage.removeItem("token");
      const newState = {
        ...state,
        token: null,
        isAuthenticated: null,
        loading: false,
        user: null,
      };
      state = newState;
      return state;
    },
    ACCOUNT_DELETED(state, action) {
      localStorage.removeItem("token");
      const newState = {
        ...state,
        token: null,
        isAuthenticated: null,
        loading: false,
        user: null,
      };
      state = newState;
      return state;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = authSlice;
// Extract and export each action creator by name
export const {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  ACCOUNT_DELETED,
} = actions;
// Export the reducer, either as a default or named export
export default reducer;
