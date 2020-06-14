import React from "react";
import Moment from "react-moment";

const Comment = props => {
  // console.log(props);
  return props.comments.map((comment, i) => {
    // console.log(comment);
    return (
      <div className="comment__component" key={i}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="comment__component--createBy">
            {comment.createdBy}
          </div>
          <div className="comment__component--createdDate">
            <Moment format="DD/MM/YYYY HH:MM">{comment.date}</Moment>
          </div>
        </div>
        <div className="comment__component--comment">{comment.comment}</div>
      </div>
    );
  });
};

export default Comment;
