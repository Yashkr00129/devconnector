import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../Spinner";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const navigate = useNavigate();
  if (auth.isAuthenticated !== true) {
    navigate("/login");
  }
  if (profile.loading === true) {
    return <Spinner />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {auth.user && auth.user.name}
      </p>
      {profile.currentUserProfile !== null ? (
        <>has {"     "}</>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
      <Link to="/create-profile" className="btn btn-primary my-1">
        Edit Profile
      </Link>
    </section>
  );
}
