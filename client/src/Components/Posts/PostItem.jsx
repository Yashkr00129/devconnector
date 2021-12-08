import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { addLike, removeLike } from "../../Store/Actions/post";

function PostItem({
  post: { _id, text, name, avatar, user, likes, comments, date },
}) {
  const auth = useSelector((state) => state.auth);
  const likedClass = "fas fa-heart color-red";
  return (
    <>
      {" "}
      <div className="post bg-white p-1 my-1">
        <div>
          <a href="profile.html">
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </a>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          <button
            type="button"
            onClick={() =>
              likes.filter((like) => like.user === auth.user._id).length > 0
                ? removeLike(_id)
                : addLike(_id)
            }
            className="btn btn-light"
          >
            <i
              className={
                likes.filter((like) => like.user === auth.user._id).length > 0
                  ? likedClass
                  : "far fa-heart"
              }
            ></i>{" "}
            {likes.length > 0 && <span>{likes.length}</span>}
          </button>
          <Link to={`/post/${_id}`} className="btn btn-primary">
            Discussion{" "}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
        </div>
        <div className="delete">
          {!auth.loading && user === auth.user._id && (
            <button className="bg-white btn delete-btn no-outline">
              <i className="far fa-trash-alt "></i>
              <span> Delete Post</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostItem;
