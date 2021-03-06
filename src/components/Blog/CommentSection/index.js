import React from "react";
import CommentForm from "./commentForm";
import Comment from "./comment";
import "./style.scss";
import {connect} from "react-redux"

const CommentApp = props => {
  return (
    <div className="comment">
      {props.comments.length > 0 ? (<h1 style={{textAlign:"center",margin:"2rem",fontSize:"4.5rem"}}>Comments...</h1>) : null }
      {props.isAuthenticated ? (<CommentForm saveComment={props.saveComment} />) : null}
      <Comment comments={props.comments} />
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps)(CommentApp);
