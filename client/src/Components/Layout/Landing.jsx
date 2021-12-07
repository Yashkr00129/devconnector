import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Landing = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (auth.isAuthenticated === true) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
