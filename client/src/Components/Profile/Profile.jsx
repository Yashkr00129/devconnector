import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Spinner from "../Layout/Spinner";
import { getProfileById } from "../../Store/Actions/profile";
import { Link } from "react-router-dom";

function Profile(props) {
  const profile = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);
  const params = useParams();
  useEffect(() => {
    getProfileById(params.id);
  }, [params]);
  const { currentUserProfile } = profile;
  if (profile.loading || profile.currentUserProfile === null)
    return <Spinner />;
  return (
    <section className="container">
      <Link to="/developers" className="btn btn-light">
        Back to profiles
      </Link>
      {auth.isAuthenticated &&
        auth.loading === false &&
        profile.loading === false &&
        auth.user._id ===currentUserProfile.user._id && (
          <Link to="/edit-profile" className="btn btn-dark">
            Edit Profile
          </Link>
        )}
    </section>
  );
}
export default Profile;
