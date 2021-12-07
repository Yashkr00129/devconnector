import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getGithubRepos } from "../../Store/Actions/profile";

function ProfileGithub({ username }) {
  const repos = useSelector((state) => state.profile).repos;
  useEffect(() => {
    getGithubRepos(username);
  }, [username]);
  return <div>Fuck</div>;
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ProfileGithub;
