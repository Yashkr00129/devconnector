import { setAlert } from "./alert";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "../Reducers/auth";
import store from "../store";
const { dispatch } = store;

// Load User
export const loadUser = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("api/auth");
    console.log(res.data)
    dispatch(USER_LOADED(res.data));
  } catch (err) {
    dispatch(AUTH_ERROR());
  }
};

// Register User
export const register = async ({ name, email, password }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("api/users", body, config);
    dispatch(REGISTER_SUCCESS(res.data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => setAlert(error.msg, "Registration Failed"));
    }
    dispatch(REGISTER_FAIL());
  }
};
