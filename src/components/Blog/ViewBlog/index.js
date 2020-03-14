import React, { Component } from "react";
import { Editor, convertFromRaw, EditorState } from "draft-js";

class ReadOnlyEditor extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      editorState: EditorState.createEmpty(),
      createdBy: "",
      createDate: ""
    };
    const content = window.localStorage.getItem("content");
    if (content) {
      this.state.editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(content))
      );
    }
  }

  componentDidMount() {
    const post = JSON.parse(window.localStorage.getItem("post"));
    const { title, createdBy, createDate } = post;
    console.log(post);
    this.setState({
      title: title,
      createdBy: createdBy,
      createDate: createDate
      //   editorState: EditorState.createWithContent(
      //     convertFromRaw(JSON.parse(editorState))
      //   )
    });
    console.log(this.state);
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
            marginBottom: "10rem"
          }}
        >
          <div className="title">{title}</div>
          <Editor editorState={editorState} readOnly={true} />
          <div className="post__metadata">
            <div className="post__metadata--created">Created By </div>
            <div className="post__metadata--createdBy"> - {createdBy}</div>
            {/* <div className="post__metadata--createdDate">{createDate}</div> */}
          </div>
        </div>
      </>
    );
  }
}

export default ReadOnlyEditor;
