import React from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { deleteExperience } from "../../Store/Actions/profile";

export default function Exp() {
  const experience = useSelector((state) => state.profile).currentUserProfile
    .experience;
  return (
    <section className="container">
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="w-20">Company</th>
            <th className="hide-sm w-10">Title</th>
            <th className="hide-sm w-5">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {experience.map((exp) => (
            <tr key={exp._id}>
              <td>{exp.company}</td>
              <td className="hide-sm">{exp.title}</td>
              <td>
                <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
                {exp.to === null ? (
                  " Now"
                ) : (
                  <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                )}
              </td>
              <td>
                <button
                  onClick={() => deleteExperience(exp._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
