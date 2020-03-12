import React, { Component } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "./style.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  onChange = editorState => {
    console.log(editorState);
    this.setState({ editorState });
  };

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );

    if (newState) {
      this.onChange(newState);
      return "handled";
    }

    return "not-handled";
  };

  onUnderlineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };

  onToggleCode = () => {
    this.onChange(RichUtils.toggleCode(this.state.editorState));
  };

  render() {
    return (
      <div className="editor">
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default App;
