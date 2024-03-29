import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {getPosts} from "../../Store/Actions/post";
import Spinner from "../Layout/Spinner";
import {useNavigate} from "react-router";
import PostForm from "./PostForm";
import PostItem from "./PostItem";

function Posts() {
    const post = useSelector((state) => state.post);
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        getPosts();
        if (!post.loading && !auth.loading && auth.isAuthenticated !== true
        )
            navigate("/login");
    }, [auth, navigate, post]);
    if (post.loading || auth.loading) return <Spinner/>;
    return (
        <section className="container">
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user">Welcome to the community</i>
            </p>
            {/* PostForm */}
            <PostForm/>
            <div className="posts">
                {post.posts.map((post) => {
                    return <PostItem key={post._id} post={post}/>;
                })}
            </div>
        </section>
    );
}

export default Posts;
