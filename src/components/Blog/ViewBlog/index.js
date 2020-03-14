import React, { Component } from "react";
import Moment from "react-moment";
import { Editor, convertFromRaw, EditorState } from "draft-js";
import Comments from "../CommentSection";

class ReadOnlyEditor extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      editorState: EditorState.createEmpty(),
      createdBy: "",
      createDate: ""
    };
    // const content = window.localStorage.getItem("content");
    // if (content) {
    //   this.state.editorState = EditorState.createWithContent(
    //     convertFromRaw(JSON.parse(content))
    //   );
    // }
  }

  componentDidMount() {
    const post = JSON.parse(window.localStorage.getItem("post"));
    // console.log(post === null);
    const { title, createdBy, createDate, editorState } = post;

    this.setState({
      title: title,
      createdBy: createdBy,
      createDate: createDate,
      editorState: EditorState.createWithContent(convertFromRaw(editorState))
    });
    // console.log(this.state);
  }

  render() {
    const { title, editorState, createDate, createdBy } = this.state;
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
          <div className="post__metadata">
            <div className="post__metadata--created">Created By </div>
            <div className="post__metadata--createdBy"> - {createdBy}</div>
          </div>
          <Comments />
        </div>
      </>
    );
  }
}

export default ReadOnlyEditor;
