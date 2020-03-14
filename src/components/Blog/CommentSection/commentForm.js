import React, { Component } from "react";

class commentForm extends Component {
  state = {
    comment: ""
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSave = () => {
    const { comment } = this.state;
    this.props.saveComment({
      comment,
      date: Date.now(),
      createdBy: "Parth Chauhan"
    });
    this.setState({
      comment: ""
    });
  };
  render() {
    return (
      <>
        <textarea
          type="text"
          onChange={this.onChange}
          value={this.state.comment}
          className="form__input comment__input"
          placeholder="Comment..."
          name="comment"
        />
        <button className="form__submit comment__submit" onClick={this.onSave}>
          Comment
        </button>
      </>
    );
  }
}

export default commentForm;
