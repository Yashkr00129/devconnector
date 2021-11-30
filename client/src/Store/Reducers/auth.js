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
    REGISTER_SUCCESS(auth, action) {
      auth.user = action.payload;
      auth.isAuthenticated = true;
      auth.loading = false;
    },
    REGISTER_FAIL(auth, action) {
      auth.token = null;
      auth.isAuthenticated = false;
      auth.loading = false;
    },
    USER_LOADED(auth, action) {
      auth.isAuthenticated = true;
      auth.loading = false;
      auth.user = action.payload;
    },
    AUTH_ERROR(auth, action) {
      auth.token = null;
      auth.isAuthenticated = false;
      auth.loading = false;
    },
    LOGIN_SUCCESS(auth, action) {
      auth.token = action.payload.token;
      auth.isAuthenticated = true;
      auth.loading = false;
    },
    LOGIN_FAIL(auth, action) {
      auth.token = null;
      auth.isAuthenticated = false;
      auth.loading = false;
    },
    LOG_OUT(auth, action) {
      auth.token = null;
      auth.isAuthenticated = null;
      auth.loading = false;
      auth.user = null;
    },
    ACCOUNT_DELETED(auth, action) {
      auth.token = null;
      auth.isAuthenticated = null;
      auth.loading = false;
      auth.user = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
