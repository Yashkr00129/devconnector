import React from "react"
import PropTypes from "prop-types"
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import Moment from "react-moment"
import {deleteComment} from "../../Store/Actions/post"

export default function CommentItem({postId, comment: {_id, text, name, avatar, user, date}}) {
    const auth = useSelector(state => state.auth)

    return <div className="post bg-white p-1 my-1">
        <div>
            <Link to={`/profile/${user}`}>
                <img className="round-img" src={avatar} alt=""/>
                <h4>{name}</h4>
            </Link>
        </div>
        <div>
            <p className="my-1">{text}</p>
            <p className="post-date">
                Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
            </p>
            {!auth.loading && user === auth.user._id && (
                <button
                    type="button"
                    className="bg-white btn delete-btn no-outline"
                    onClick={() =>{
                        deleteComment(postId,_id)
                    }}
                >
                    <i className="far fa-trash-alt color-red"/>{" "}
                    <span className="color-red">Delete comment</span>
                </button>
            )}
        </div>
    </div>
}

CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired
}