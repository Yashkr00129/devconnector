import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../Spinner";
import Alert from "../Alert"

export default function Dashboard() {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const alerts = useSelector((state) => state.alert);
  const navigate = useNavigate();
  if (auth.isAuthenticated !== true) {
    navigate("/login");
  }
  if (profile.loading === true) {
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
