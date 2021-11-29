import React, { useState } from "react";
import { addEducation } from "../../Store/Actions/profile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Spinner from "../Layout/Spinner";
import Alert from "../Layout/Alert";

export default function AddEducation() {
  const profile = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);
  const alerts = useSelector((state) => state.alert);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      school === undefined ||
      degree === undefined ||
      fieldofstudy === undefined ||
      from === undefined
    ) {
      return;
    } else {
      try {
        await addEducation(formData);
        await navigate("/dashboard");
      } catch (e) {}
    }
  };
  if (auth.isAuthenticated !== true) navigate("/login");
  if (profile.loading === true) return <Spinner />;
  return (
    <section className="container">
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
            value={school}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
            value={degree}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group w-20">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              onChange={() => setFormData({ ...formData, current: !current })}
            />{" "}
            Current School or Bootcamp
          </p>
        </div>
        {current ? null : (
          <div className="form-group w-20">
            <h4>To Date</h4>
            <input
              type="date"
              name="to"
              value={to}
              onChange={(e) => onChange(e)}
            />
          </div>
        )}
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>{" "}
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
