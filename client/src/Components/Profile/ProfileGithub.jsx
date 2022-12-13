import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getGithubRepos } from "../../Store/Actions/profile";
import Spinner from "../Layout/Spinner";

function ProfileGithub({ username }) {
  const {repos} = useSelector((state) => state.profile);

  useEffect(() => {
    getGithubRepos(username)
  }, [username]);
  if(repos===null) return <Spinner/>
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {
        repos.map((repo) => (
          <div key={repo?.id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo?.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name.toUpperCase()}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary p-1">
                  Stars: {repo.stargazers_count}
                </li>
                <li className="badge badge-dark p-1">
                  Watchers: {repo.watchers_count}
                </li>
                <li className="badge badge-light p-1">
                  Forks: {repo.forks_count}
                </li>
              </ul>
            </div>
          </div>
        ))
      }
    </div>
  );
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ProfileGithub;
