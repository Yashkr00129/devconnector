import { SET_ALERT, REMOVE_ALERT } from "../Reducers/alert";
import store from "../store";
import { nanoid } from "@reduxjs/toolkit";
const { dispatch } = store;

export const setAlert = (msg, alertType) => {
  const id = nanoid(10);
  dispatch(SET_ALERT({ id, msg, alertType }));
  setTimeout(() => {
    dispatch(REMOVE_ALERT(id));
  }, 5000);
};
