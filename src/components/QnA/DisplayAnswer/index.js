import React, { Component } from "react";
import Vote from "../../../asserts/vote_triangle.png";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { SERVER_URL } from "../../../utils/constants";
import Moment from "react-moment";
import { connect } from "react-redux";

class DisplayAnswer extends Component {
  state = {
    question: {
      question: "",
      answers: [],
    },
  };

  async componentDidMount() {
    const { params } = this.props.match;
    const data = await axios.get(`${SERVER_URL}/question/${params.qID}`);
    this.setState({ question: data.data.question });
  }

  async handleUpVotes(ansID) {
    // eslint-disable-next-line array-callback-return
    this.state.question.answers.filter((ans, i) => {
      if (ansID === ans._id) {
        const ans = this.state.question.answers;
        ans[i].vote++;
        this.setState({ ...this.state.question.answers, ans });
      }
    });
    const { params } = this.props.match;
    await axios.post(`${SERVER_URL}/question/${params.qID}/${ansID}/upvote`);
  }

  async handleDownVotes(ansID) {
    // eslint-disable-next-line array-callback-return
    this.state.question.answers.filter((ans, i) => {
      if (ansID === ans._id) {
        const ans = this.state.question.answers;
        ans[i].vote--;
        this.setState({ ...this.state.question.answers, ans });
      }
    });
    const { params } = this.props.match;
    await axios.post(`${SERVER_URL}/question/${params.qID}/${ansID}/downvote`);
  }

  render() {
    const { question } = this.state;
    // console.log(question);
    const { params } = this.props.match;
    return (
      <div className="ans">
        <div className="ans__title">{question.question}</div>
        <div className="ans__button">
          <NavLink
            to={`/qna/${params.qID}/answer`}
            style={{ textDecoration: "none" }}
          >
            <div className="form__submit">+ Add your answer</div>
          </NavLink>
        </div>
        <div className="ans__answers">
          {question.answers.map((ans) => (
            <div key={ans._id}>
              <div className="ans__ans">
                <div className="ans__votes">
                  {this.props.isAuthenticated ? (
                    <img
                      src={Vote}
                      alt="Vote"
                      onClick={() => this.handleUpVotes(ans._id)}
                      height="30"
                      width="30"
                      style={{ cursor: "pointer" }}
                    />
                  ) : null}
                  {/* <span>{ans.upvote}</span> */}
                  <span style={{ fontWeight: "bolder" }}>{ans.vote}</span>
                  {this.props.isAuthenticated ? (
                    <img
                      src={Vote}
                      alt="Vote"
                      height="30"
                      onClick={() => this.handleDownVotes(ans._id)}
                      width="30"
                      style={{
                        transform: " rotate(180deg)",
                        cursor: "pointer",
                      }}
                    />
                  ) : null}
                </div>
                <div className="ans__ans--text">{ans.answer}</div>
              </div>
              <div className="ans__stamp">
                <div>
                  <Moment format="DD/MM/YYYY HH:MM">{ans.date}</Moment>
                </div>
                <div style={{ fontWeight: "bold" }}>
                  <span>{"-- " + ans.user.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(connect(mapStateToProps)(DisplayAnswer));
