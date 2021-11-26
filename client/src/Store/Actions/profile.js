import axios from "axios";
// import { setAlert } from "./alert";
import { profileActions } from "../Reducers/profile";
import { setAlert } from "./alert";
import store from "../store";
const { dispatch } = store;

// Get current users profile
export const getCurrentProfile = async () => {
  try {
    const res = await axios.get("api/profile/me");
    await dispatch(profileActions.GET_PROFILE(res.data));
  } catch (error) {
    dispatch(
      profileActions.PROFILE_ERROR({
        msg: error.response.statusText,
        status: error.response.status,
      })
    );
  }
};

// Get all profiles
export const getAllProfiles = async () => {
  try {
    const res = await axios.get("api/profile");
    await dispatch(profileActions.GET_ALL_PROFILES(res.data));
  } catch (err) {}
};

// Create or update profile
export const createProfile = async (formData, edit) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("api/profile", formData, config);
    await dispatch(profileActions.GET_PROFILE(res.data));
    await setAlert(edit === true ? "Profile Updated" : "Profile Created");
  } catch (error) {
    dispatch(
      profileActions.PROFILE_ERROR({
        msg: error.response.statusText,
        status: error.response.status,
      })
    );
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => setAlert(error.msg, "Invalid Credentials"));
    }
  }
};
