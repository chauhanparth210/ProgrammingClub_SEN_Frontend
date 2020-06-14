import React, { Component } from "react";
import Vote from "../../../asserts/vote_triangle.png";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { SERVER_URL } from "../../../utils/constants";
import Moment from "react-moment";

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
    console.log(data);
  }

  render() {
    const { question } = this.state;
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
                  <img src={Vote} alt="Vote" height="30" width="30" />
                  <span>{ans.upvote}</span>
                  <img
                    src={Vote}
                    alt="Vote"
                    height="30"
                    width="30"
                    style={{ transform: " rotate(180deg)" }}
                  />
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

export default withRouter(DisplayAnswer);
