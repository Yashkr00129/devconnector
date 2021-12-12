import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { removeLike, addLike, deletePost } from "../../Store/Actions/post";

function PostItem({
  post: {
    _id,
    text,
    name,
    avatar,
    user,
    likes,
    comments,
    date,
  },
  showActions = true
}) {
  const auth = useSelector((state) => state.auth);
  return (
    <>
      {" "}
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          {showActions && (
            <>
              {" "}
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
                    likes.filter((like) => like.user === auth.user._id).length >
                    0
                      ? "fas fa-heart color-red"
                      : "far fa-heart"
                  }
                ></i>{" "}
                {likes.length > 0 && <span>{likes.length}</span>}
              </button>
              <Link to={`/post/${_id}`} className="btn btn-primary bg-white mx">
                Discussion{" "}
                {comments.length > 0 && (
                  <span className="comment-count">{comments.length}</span>
                )}
              </Link>
            </>
          )}
        </div>
        {showActions && (
          <>
            {" "}
            <div className="delete">
              {!auth.loading && user === auth.user._id && (
                <button
                  onClick={() => {
                    deletePost(_id);
                  }}
                  className="bg-white btn delete-btn no-outline"
                >
                  <i className="far fa-trash-alt "></i>
                  <span> Delete Post</span>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostItem;
