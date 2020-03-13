import React, { Component } from "react";
import { EditorState } from "draft-js";
import createEmojiPlugin from "draft-js-emoji-plugin";
import Editor from "draft-js-plugins-editor";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton
} from "draft-js-buttons";
import createInlineToolbarPlugin, {
  Separator
} from "draft-js-inline-toolbar-plugin";

import "draft-js-emoji-plugin/lib/plugin.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "./style.scss";

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

class HeadlinesPicker extends Component {
  componentDidMount() {
    setTimeout(() => {
      window.addEventListener("click", this.onWindowClick);
    });
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.onWindowClick);
  }

  onWindowClick = () =>
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    this.props.onOverrideContent(undefined);

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((
          Button,
          i // eslint-disable-next-line
        ) => (
          <Button key={i} {...this.props} />
        ))}
      </div>
    );
  }
}

class HeadlinesButton extends Component {
  // When using a click event inside overridden content, mouse down
  // events needs to be prevented so the focus stays in the editor
  // and the toolbar remains visible  onMouseDown = (event) => event.preventDefault()
  onMouseDown = event => event.preventDefault();

  onClick = () =>
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    this.props.onOverrideContent(HeadlinesPicker);

  render() {
    return (
      <div onMouseDown={this.onMouseDown} className="headlineButtonWrapper">
        <button onClick={this.onClick} className="headlineButton">
          H
        </button>
      </div>
    );
  }
}

// const inlineToolbarPlugin = createInlineToolbarPlugin();
// const { InlineToolbar } = inlineToolbarPlugin;

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
        <InlineToolbar>
          {// may be use React.Fragment instead of div to improve perfomance after React 16
          externalProps => (
            <div>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              {/* <CodeButton {...externalProps} /> */}
              <Separator {...externalProps} />
              <HeadlinesButton {...externalProps} />
              {/* <CodeBlockButton {...externalProps} /> */}
            </div>
          )}
        </InlineToolbar>
      </div>
    );
  }
}

export default App;
