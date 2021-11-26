import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createProfile } from "../../Store/Actions/profile";
import Alert from "../Layout/Alert";
import { useNavigate } from "react-router";
import Spinner from "../Layout/Spinner";

export default function CreateProfile() {
  const profile = useSelector((state) => state.profile);
  const alerts = useSelector((state) => state.alert);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const current = { ...profile.currentUserProfile };
  console.log(current);
  if (auth.isAuthenticated !== true) {
    navigate("/login");
  }
  const [formData, setFormData] = useState({ ...profile.currentUserProfile });
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  if (profile.loading === true) {
    return <Spinner />;
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(
      { ...formData, skills: skills.toString() },
      profile.currentUserProfile === false ||
        profile.currentUserProfile === null
        ? false
        : true
    );
    setTimeout(() => navigate("/dashboard"), 3000);
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select value={status} name="status" onChange={(e) => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text mx-1">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company || ""}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text mx-1">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website || ""}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text mx-1">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location || ""}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text mx-1">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills || ""}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text mx-1">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text mx-1">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            className="textarea"
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text mx-1">
            Tell us a little about yourself
          </small>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              toggleSocialInputs(!displaySocialInputs);
            }}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs ? (
          <>
            {" "}
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
              />
            </div>
          </>
        ) : null}
        {alerts.map((alert) => (
          <Alert msg={alert.msg} key={alert.id} />
        ))}
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="/dashboard">
          Go Back
        </a>
      </form>
    </section>
  );
}
