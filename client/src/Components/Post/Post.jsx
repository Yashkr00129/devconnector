import React, { useEffect } from "react";
import Spinner from "../Layout/Spinner";
import { useSelector } from "react-redux";
import { getPostById } from "../../Store/Actions/post";
import { useNavigate, useParams } from "react-router-dom";

function Post() {
  const postState = useSelector((state) => state.post);
  const auth = useSelector((state) => state.auth);
  const params = useParams();
  const { post, loading } = postState;
  const navigate = useNavigate();
  useEffect(() => {
    getPostById(params.id);
    if (auth.loading || loading) return <Spinner />;
    if (auth.loading === false && auth.isAuthenticated !== true) {
      navigate("/posts");
    }
  }, [params, navigate, auth]);

  return <div className="container">FUCK</div>;
}

export default Post;
