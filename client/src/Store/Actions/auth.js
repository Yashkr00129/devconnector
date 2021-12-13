import { setAlert } from "./alert";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { getCurrentProfile } from "./profile";
import { authActions } from "../Reducers/auth";
import { profileActions } from "../Reducers/profile";
import store from "../store";
const { dispatch } = store;

// Login and register user just gives us the token so what we do to get the data of the user is we load the user
// Load User
export const loadUser = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    try {
      const res = await axios.get("/api/auth");
      await dispatch(authActions.USER_LOADED(res.data));
      await getCurrentProfile();
    } catch (err) {
      console.log(err.message)
      dispatch(authActions.AUTH_ERROR());
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
    dispatch(authActions.REGISTER_SUCCESS(res.data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => setAlert(error.msg, "Registration Failed"));
    }
    dispatch(authActions.REGISTER_FAIL());
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
    await dispatch(authActions.LOGIN_SUCCESS(res.data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => setAlert(error.msg, "Invalid Credentials"));
    }
    dispatch(authActions.LOGIN_FAIL());
  }
};

export const logOut = () => {
  dispatch(authActions.LOG_OUT());
  dispatch(profileActions.CLEAR_PROFILE());
};
