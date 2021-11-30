import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import alertSlice from "./Reducers/alert";
import authSlice from "./Reducers/auth";
import profileSlice from "./Reducers/profile";
import LocalStorageMiddleware from "./Middleware/localStorage";
// Redux
const store = configureStore({
  reducer: {
    alert: alertSlice,
    auth: authSlice,
    profile: profileSlice,
  },
  middleware: [
    ...getDefaultMiddleware(),
    LocalStorageMiddleware
  ],
});

export default store;
