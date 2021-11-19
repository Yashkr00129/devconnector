import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import alertSlice from "./Reducers/alert";
import authSlice from "./Reducers/auth";
// Redux
const store = configureStore({
  reducer: {
    alert: alertSlice,
    auth: authSlice,
  },
  middleware: [...getDefaultMiddleware()],
});

export default store;
