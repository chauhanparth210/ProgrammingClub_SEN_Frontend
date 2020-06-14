import React from "react";
import CommentForm from "./commentForm";
import Comment from "./comment";
import "./style.scss";

const CommentApp = props => {
  return (
    <div className="comment">
      <CommentForm saveComment={props.saveComment} />
      <Comment comments={props.comments} />
    </div>
  );
};

export default CommentApp;
