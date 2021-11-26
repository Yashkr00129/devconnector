import { setAlert } from "./alert";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { getCurrentProfile } from "./profile";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOG_OUT,
} from "../Reducers/auth";
import { profileActions } from "../Reducers/profile";
import store from "../store";
const { dispatch } = store;

// Login and register user just gives us the token so what we do to get the data of the user is we load the user

// Load User
export const loadUser = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    try {
      const res = await axios.get("api/auth");
      dispatch(USER_LOADED(res.data));
      getCurrentProfile();
    } catch (err) {
      dispatch(AUTH_ERROR());
      console.log(err.message);
    }
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

// Login User
export const login = async (email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("api/auth", body, config);
    dispatch(LOGIN_SUCCESS(res.data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => setAlert(error.msg, "Invalid Credentials"));
    }
    dispatch(LOGIN_FAIL());
  }
};

export const logOut = () => {
  dispatch(LOG_OUT());
  dispatch(profileActions.CLEAR_PROFILE());
};
