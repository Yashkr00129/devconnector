import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../Store/Actions/profile";
import Spinner from "../Layout/Spinner";

function ProfileGithub({ username, getGithubRepos, repos }) {
  useEffect(() => {
    getGithubRepos(username);
    console.log('Profile not loading')
  }, [getGithubRepos,username]);
  return <div></div>;
}

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});
export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
