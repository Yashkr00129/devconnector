import React from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { deleteEducation } from "../Store/Actions/profile";

export default function Edu() {
  const education = useSelector((state) => state.profile).currentUserProfile
    .education;
  return (
    <section className="container">
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="w-20">School</th>
            <th className="hide-sm w-10">Degree</th>
            <th className="hide-sm w-5">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {education.map((edu) => (
            <tr key={edu._id}>
              <td>{edu.school}</td>
              <td className="hide-sm">{edu.degree}</td>
              <td>
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
                {edu.to === null ? (
                  " Now"
                ) : (
                  <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                )}
              </td>
              <td>
                <button onClick={()=>deleteEducation(edu._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
