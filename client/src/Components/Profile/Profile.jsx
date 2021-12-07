import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Spinner from "../Layout/Spinner";
import { getProfileById } from "../../Store/Actions/profile";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

function Profile(props) {
  const profile = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);
  const params = useParams();
  useEffect(() => {
    getProfileById(params.id);
  }, [params]);
  const { currentUserProfile } = profile;
  if (profile.loading || profile.currentUserProfile === null)
    return <Spinner />;
  return (
    <section className="container">
      <Link to="/developers" className="btn btn-light">
        Back to profiles
      </Link>
      {auth.isAuthenticated &&
        auth.loading === false &&
        profile.loading === false &&
        auth.user._id === currentUserProfile.user._id && (
          <Link to="/edit-profile" className="btn btn-dark">
            Edit Profile
          </Link>
        )}
      <div className="profile-grid my-1">
        <ProfileTop profile={currentUserProfile} />
        <ProfileAbout profile={currentUserProfile} />
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {currentUserProfile.experience.length > 0 ? (
            <>
              {currentUserProfile.experience.map((exp) => (
                <ProfileExperience key={exp._id} experience={exp} />
              ))}
            </>
          ) : (
            <h4>No experience credentials</h4>
          )}
        </div>
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {currentUserProfile.education.length > 0 ? (
            <>
              {currentUserProfile.education.map((edu) => (
                <ProfileEducation key={edu._id} education={edu} />
              ))}
            </>
          ) : (
            <h4>No education credentials</h4>
          )}
        </div>
        {currentUserProfile.githubusername && <ProfileGithub username="currentUserProfile.githubusername"/>}
      </div>
    </section>
  );
}
export default Profile;
