import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import {
  likePost,
  unlikePost,
  dislikePost,
  unDislikePost,
} from "../../Store/Actions/post";

function PostItem({
  post: { _id, text, name, avatar, user, likes, comments, date, dislikes },
}) {
  const auth = useSelector((state) => state.auth);

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
            className="btn btn-light"
            onClick={(e) =>
              likes.filter((like) => like.user === auth.user._id.toString())
                .length > 0
                ? unlikePost(_id)
                : likePost(_id)
            }
          >
            <i
              className={
                likes.filter((like) => like.user === auth.user._id.toString())
                  .length > 0
                  ? "fas fa-heart color-pink"
                  : "far fa-heart"
              }
            ></i>{" "}
            {likes.length > 0 && <span>{likes.length}</span>}
          </button>
          <button
            type="button"
            onClick={(e) =>
              dislikes.filter(
                (dislike) => dislike.user === auth.user._id.toString()
              ).length > 0
                ? unDislikePost(_id)
                : dislikePost(_id)
            }
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-down"></i>
            {dislikes.length > 0 && <span>{dislikes.length}</span>}
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
            <button type="button" className="btn btn-danger delete-btn">
              <i className="fas fa-trash-alt"> </i> Delete Post
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
