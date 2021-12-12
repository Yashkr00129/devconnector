import axios from "axios";
// import { setAlert } from "./alert";
import { profileActions } from "../Reducers/profile";
import { setAlert } from "./alert";
import store from "../store";
import { authActions } from "../Reducers/auth";
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
  dispatch(profileActions.CLEAR_PROFILE());
  try {
    const res = await axios.get("api/profile");
    await dispatch(profileActions.GET_ALL_PROFILES(res.data));
  } catch (err) {
    dispatch(
      profileActions.PROFILE_ERROR({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Get profile by id
export const getProfileById = async (id) => {
  try {
    const res = await axios.get(`/api/profile/user/${id}`);
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

// Add experience
export const addExperience = async (formData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("api/profile/experience", formData, config);
    await dispatch(profileActions.UPDATE_PROFILE(res.data));
    await setAlert("Profile Updated");
  } catch (error) {
    dispatch(
      profileActions.PROFILE_ERROR({
        msg: error.response.statusText,
        status: error.response.status,
      })
    );
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => setAlert(error.msg, "FAIL"));
    }
  }
};

// Add education
export const addEducation = async (formData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("api/profile/education", formData, config);
    await dispatch(profileActions.UPDATE_PROFILE(res.data));
    await setAlert("Profile Updated");
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

// Delete Experience
export const deleteExperience = async (id) => {
  try {
    const res = await axios.delete(`api/profile/experience/${id}`);
    await dispatch(profileActions.UPDATE_PROFILE(res.data));
    setAlert("Experience Deleted");
  } catch (error) {
    dispatch(
      profileActions.PROFILE_ERROR({
        msg: error.response.statusText,
        status: error.response.status,
      })
    );
  }
};

// Delete Education
export const deleteEducation = async (id) => {
  try {
    const res = await axios.delete(`api/profile/education/${id}`);
    await dispatch(profileActions.UPDATE_PROFILE(res.data));
    setAlert("Education Deleted");
  } catch (error) {
    dispatch(
      profileActions.PROFILE_ERROR({
        msg: error.response.statusText,
        status: error.response.status,
      })
    );
  }
};

// Delete account & profile
export const deleteAccount = async (id) => {
  if (window.confirm("Are you sure? This can not be undone!")) {
    try {
      await axios.delete(`api/profile`);
      await dispatch(profileActions.CLEAR_PROFILE());
      await dispatch(authActions.ACCOUNT_DELETED());
      await setAlert("Your account has been permanently deleted");
    } catch (error) {
      dispatch(
        profileActions.PROFILE_ERROR({
          msg: error.response.statusText,
          status: error.response.status,
        })
      );
    }
  }
};

// Get Github Repos
export const getGithubRepos = async (username) => {
  const url = `/api/github/${username}`;
  try {
    const res = await axios.get(url);
    await dispatch(profileActions.GET_REPOS(res.data));
  } catch (err) {
    dispatch(
      profileActions.PROFILE_ERROR({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};
