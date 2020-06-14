import React, { Component } from "react";
import { connect } from "react-redux";

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
    // console.log(this.props.username);
    this.props.saveComment({
      comment,
      date: Date.now(),
      createdBy: this.props.name
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

const mapStateToProps = state => ({
  name: state.auth.user.name
});

export default connect(mapStateToProps)(commentForm);
