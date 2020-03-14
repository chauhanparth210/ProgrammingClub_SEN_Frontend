import React, { Component } from "react";
import CommentForm from "./commentForm";
import Comment from "./comment";
import "./style.scss";

class CommentApp extends Component {
  state = {
    comments: []
  };
  saveComment = comment => {
    this.setState({
      comments: [comment, ...this.state.comments]
    });
  };
  render() {
    return (
      <div className="comment">
        <CommentForm saveComment={this.saveComment} />
        <Comment comments={this.state.comments} />
      </div>
    );
  }
}

export default CommentApp;
