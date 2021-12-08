import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getPosts } from "../../Store/Actions/post";
import Spinner from "../Layout/Spinner";
import { useNavigate } from "react-router";
import PostItem from "./PostItem";

function Posts() {
  const post = useSelector((state) => state.post);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.isAuthenticated !== true) return navigate("/login");
    getPosts();
  }, [auth, navigate]);
  if (post.loading) return <Spinner />;
  return (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user">Welcome to the community</i>
      </p>
      {/* PostForm */}
      <div className="posts">
        {post.posts.map((post) => {
          return <PostItem key={post._id} post={post} />;
        })}
      </div>
    </section>
  );
}

export default Posts;
