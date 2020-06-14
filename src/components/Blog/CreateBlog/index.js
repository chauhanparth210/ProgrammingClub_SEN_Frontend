import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
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

import axios from "axios";
import { connect } from "react-redux";

import { SERVER_URL } from "../../../utils/constants";

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

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      editorState: EditorState.createEmpty()
    };
  }

  onChange = editorState => {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState);
    this.setState({
      editorState
    });
  };

  onTitleUpdate = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSavePost = () => {
    const { title, editorState } = this.state;
    const post = {
      title,
      editorState: convertToRaw(editorState.getCurrentContent()),
      createdBy: this.props.id,
      createDate: Date.now()
    };
    window.localStorage.setItem("post", JSON.stringify(post));

    axios
      .post(`${SERVER_URL}/post/`, post)
      .then(savePost => {
        console.log("post is saved..");
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      editorState: EditorState.createEmpty(),
      title: ""
    });
    window.localStorage.removeItem("content");
  };

  saveContent = content => {
    window.localStorage.setItem(
      "content",
      JSON.stringify(convertToRaw(content))
    );
  };

  render() {
    return (
      <>
        <div className="editor--playground">
          <input
            type="text"
            className="title"
            value={this.state.title}
            name="title"
            placeholder="Title of the post"
            onChange={this.onTitleUpdate}
          />
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
                <Separator {...externalProps} />
                <HeadlinesButton {...externalProps} />
              </div>
            )}
          </InlineToolbar>
        </div>
        <div className="form__wrapper wrapper">
          <button
            type="submit"
            className="form__submit"
            onClick={this.onSavePost}
          >
            Post it...
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  id: state.auth.user.id
});

export default connect(mapStateToProps)(App);
