import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../Layout/Spinner";
import { getAllProfiles } from "../../Store/Actions/profile";
import ProfileItem from "./ProfileItem";

export default function Profiles() {
  const profile = useSelector((state) => state.profile);
  useEffect(() => {
    getAllProfiles();
  }, []);
  if (profile.loading) return <Spinner />;
  return (
    <section className="container">
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i>  {"  "} Browse and connect with
        developers
      </p>
      <div className="profiles">
        {profile.allProfiles.length > 0 ? (
          profile.allProfiles.map((profile) => (
            <ProfileItem key={profile._id} profile={profile} />
          ))
        ) : (
          <h4>No Profiles Found</h4>
        )}
      </div>
    </section>
  );
}
