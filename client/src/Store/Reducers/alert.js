import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alerts",
  initialState: [],
  reducers: {
    SET_ALERT(state, action) {
      state.push(action.payload);
    },
    REMOVE_ALERT(state, action) {
      const newState = state.filter((alert) => alert.id !== action.payload);
      state = newState;
      return state;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = alertSlice;
// Extract and export each action creator by name
export const { SET_ALERT, REMOVE_ALERT } = actions;
// Export the reducer, either as a default or named export
export default reducer;
