import React, { Component } from "react";
import Moment from "react-moment";
import { Editor, convertFromRaw, EditorState } from "draft-js";
import Comments from "../CommentSection";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../../utils/constants";
import clap from "../../../asserts/claps.png";

class ReadOnlyEditor extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      editorState: EditorState.createEmpty(),
      createdBy: "",
      createDate: "",
      claps: "",
      comments: []
    };
  }

  componentDidMount() {
    axios
      .get(`${SERVER_URL}/post/${this.props.match.params.post_id}`)
      .then(postData => {
        // console.log(postData.data);
        const { post, user, date, title, likes, comments } = postData.data;
        this.setState({
          title,
          createdBy: user.name,
          createDate: date,
          editorState: EditorState.createWithContent(convertFromRaw(post)),
          claps: likes,
          comments: comments
        });
      })
      .catch(err => console.log(err));
  }

  onClap = () => {
    axios
      .post(`${SERVER_URL}/post/like/${this.props.match.params.post_id}`)
      .then(post => {
        this.setState({
          claps: this.state.claps + 1
        });
        console.log("post claped");
      })
      .catch(err => console.log(err));
  };

  saveComment = commentitem => {
    // console.log(comment);
    axios
      .post(
        `${SERVER_URL}/post/comment/${this.props.match.params.post_id}`,
        commentitem
      )
      .then(comment => {
        this.setState({
          comments: [commentitem, ...this.state.comments]
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const {
      title,
      editorState,
      createDate,
      createdBy,
      claps,
      comments
    } = this.state;
    return (
      <>
        <div
          className="editor--playground"
          style={{
            overflow: "visible",
            flex: "1",
            height: "auto",
            marginBottom: "4rem"
          }}
        >
          <div className="title">{title}</div>
          <div className="post__metadata--createdDate">
            <Moment format="DD/MM/YYYY">{createDate}</Moment>
          </div>
          <Editor editorState={editorState} readOnly={true} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div className="post__metadata">
              <div className="post__metadata--created">Created By </div>
              <div className="post__metadata--createdBy"> - {createdBy}</div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <img
                src={clap}
                alt="claps"
                className="claps"
                onClick={this.onClap}
              />
              {claps}
            </div>
            {/* {claps} */}
          </div>
          <Comments comments={comments} saveComment={this.saveComment} />
        </div>
      </>
    );
  }
}

export default withRouter(ReadOnlyEditor);
