import React, { Component } from "react";
import { EditorState } from "draft-js";
import createEmojiPlugin from "draft-js-emoji-plugin";
import Editor from "draft-js-plugins-editor";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";

import "draft-js-emoji-plugin/lib/plugin.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "./style.scss";

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

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

  render() {
    return (
      <div className="editor--playground">
        <input type="text" className="title" placeholder="Title of the post" />
        <Editor
          placeholder="Post..."
          editorState={this.state.editorState}
          plugins={[emojiPlugin, inlineToolbarPlugin]}
          onChange={this.onChange}
          ref={element => {
            this.editor = element;
          }}
        />
        <EmojiSuggestions />
        <InlineToolbar />
      </div>
    );
  }
}

export default App;
