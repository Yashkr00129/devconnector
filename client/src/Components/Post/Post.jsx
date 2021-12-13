import React, {useEffect} from "react";
import Spinner from "../Layout/Spinner";
import {useSelector} from "react-redux";
import {getPostById} from "../../Store/Actions/post";
import {useParams, useNavigate, Link} from "react-router-dom";
import PostItem from "../Posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem"

function Post() {
    const postState = useSelector((state) => state.post);
    const auth = useSelector((state) => state.auth);
    const params = useParams();
    const {post, loading} = postState;
    const navigate = useNavigate();
    useEffect(() => {
        getPostById(params.id);
        if (loading===false && auth.loading===false && auth.isAuthenticated !== true) navigate("/posts")

    }, [params, navigate, auth, loading]);

    if (auth.loading || loading || post == null) return <Spinner/>;
    return (
        <section className="container">
            <Link to="/posts" className="btn">
                Back To Posts
            </Link>
            <PostItem post={post} showActions={false}/>

            <CommentForm postId={params.id}/>
            <div className="comments">
                {post.comments.map(comment => (<CommentItem key={comment._id} comment={comment} postId={post._id}/>))}
            </div>
        </section>

    );
}

export default Post;
