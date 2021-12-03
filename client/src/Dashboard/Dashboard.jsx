import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../Components/Layout/Spinner";
import Alert from "../Components/Layout/Alert";
import Exp from "./Exp";
import Edu from "./Edu";
import { deleteAccount, getCurrentProfile } from "../Store/Actions/profile";

export default function Dashboard() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);
  const alerts = useSelector((state) => state.alert);
  React.useEffect(() => {
    getCurrentProfile();
    if (auth.isAuthenticated !== true) {
      navigate("/login");
    }
  }, [auth,navigate]);
  if (profile.loading || auth.loading) {
    return <Spinner />;
  }

  return (
    <section className="container">
      {alerts.map((alert) => (
        <Alert msg={alert.msg} key={alert.id} />
      ))}
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {auth.user && auth.user.name}
      </p>
      {profile.currentUserProfile !== null ? (
        <>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Edit Profile
          </Link>
          <Link to="/add-experience" className="btn btn-primary my-1">
            Add Experience
          </Link>
          <Link to="/add-education" className="btn btn-primary my-1">
            Add Education
          </Link>
          {profile.currentUserProfile.experience.length > 0 ? (
            <Exp />
          ) : (
            <Alert msg="You dont have any experience" color="gray" />
          )}
          {profile.currentUserProfile.education.length > 0 ? (
            <Edu />
          ) : (
            <Alert msg="You dont have any education" color="gray" />
          )}
          <div
            onClick={async () => {
              await deleteAccount();
              await navigate("/");
            }}
            className="my-2"
          >
            <button className="btn btn-danger delete-btn">
              <i className="fas fa-user" /> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </section>
  );
}
