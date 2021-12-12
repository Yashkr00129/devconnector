import React, { useState } from "react";
import { addComment } from "../../Store/Actions/post";

function CommentForm({postId}) {
  const [text, setText] = useState();
  return (
    <div className="post-form">
      <h3 className="text-primary">Leave a Comment</h3>
      <form
        className="form my-1"
        onSubmit={async (e) => {
          e.preventDefault();
          await addComment(postId, { text });
          await setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Leave a comment"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
}

CommentForm.propTypes = {

};

export default CommentForm;
