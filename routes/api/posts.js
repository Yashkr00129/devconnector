const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

// @route  POST api/posts
// @desc   Create a post
// access  Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        user: req.user.id,
        avatar: user.avatar,
      });
      const post = await newPost
        .save()
        .catch((err) => console.log(err.message));
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  GET api/posts
// @desc   Get all posts
// access  Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET api/posts/:id
// @desc   Get one posts
// access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  DELETE api/posts/:id
// @desc   Delete one post
// access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "User not authorised" });
    await post.remove();
    res.json({ msg: "Post removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route  PUT api/posts/like/:id
// @desc   Like one post
// access  Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if post has already been liked by user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
      // This expression checks if in the post.likes array has the id of the current user
    )
      return res.status(400).json({ msg: "Post already liked" });
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  PUT api/posts/dislike/:id
// @desc   Like one post
// access  Private
router.put("/dislike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if post has already been disliked by user
    if (
      post.dislikes.filter((dislike) => dislike.user.toString() === req.user.id)
        .length > 0
      // This expression checks if in the post.dislikes array has the id of the current user
    )
      return res.status(400).json({ msg: "Post already disliked" });
    post.dislikes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.dislikes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  PUT api/posts/dislike/:id
// @desc   Undislike one post
// access  Private
router.put("/undislike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if a post is not disliked
    if (
      !post.dislikes.filter(
        (dislike) => dislike.user.toString() === req.user.id
      ).length > 0
    ) {
      // Post not disliked
      return res
        .status(400)
        .json({ msg: "Post needs to be disliked in order to be disdisliked" });
    }
    const index = post.dislikes.findIndex((dislike) => dislike == req.user.id);
    post.dislikes.splice(index, 1);
    post.save();
    res.json(post.dislikes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  PUT api/posts/like/:id
// @desc   Unlike one post
// access  Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if a post is not liked
    if (
      !post.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      // Post not liked
      return res
        .status(400)
        .json({ msg: "Post needs to be liked in order to be disliked" });
    }
    const index = post.likes.findIndex((like) => like == req.user.id);
    post.likes.splice(index, 1);
    post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/posts/comment/:id
// @desc   Comment on a post
// access  Private
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id,
        avatar: user.avatar,
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  DELETE api/posts/comment/:id/:comment_id
// @desc   Delete a comment
// access  Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    // Get Comment
    const post = await Post.findById(req.params.id);
    const comments = post.comments;
    // Check if it is users comment
    const comment = comments.find((c) => c.id == req.params.comment_id);
    if (!comment) return res.status(404).json({ msg: "No Comment Like this" });
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorised" });
    // Delete Comment
    const index = comments.findIndex((c) => c.id == req.params.comment_id);
    comments.splice(index, 1);
    post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
