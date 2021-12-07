import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Store/Actions/auth";
import { loadUser } from "../../Store/Actions/auth";
import { useSelector } from "react-redux";
import Alert from "../Layout/Alert";

export const Login = () => {
  const auth = useSelector((state) => state.auth);
  const alerts = useSelector((state) => state.alert);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (auth.isAuthenticated === true) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      await loadUser();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <section className="container">
      {alerts.length > 0
        ? alerts.map((alert) => <Alert msg={alert.msg} key={alert.id} />)
        : null}
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign In To Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            minLength="6"
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
};
