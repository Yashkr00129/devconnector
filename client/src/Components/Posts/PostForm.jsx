import React, { useState } from "react";
import PropTypes from "prop-types";
import { addPost } from "../../Store/Actions/post";

export default function PostForm() {
  const [text, setText] = useState("");
  return (
    <div className="post-form">
      <h3 className="text-primary">Say Something...</h3>
      <form
        action=""
        className="form my-1"
        onSubmit={async (e) => {
          e.preventDefault();
          await addPost({ text });
          await setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
}
