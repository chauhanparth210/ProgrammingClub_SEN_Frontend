import React, { Component } from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../utils/constants";

class QnA extends Component {
  state = {
    questions: [],
  };

  componentDidMount() {
    axios.get(`${SERVER_URL}/question`).then((questions) => {
      const { data } = questions;
      // console.log(data);
      this.setState({
        questions: data,
      });
    });
  }

  render() {
    const { questions } = this.state;
    console.log(questions);
    return (
      <div className="qna">
        <div className="qna__title">
          <div className="qna__title--text">Question & Answer</div>
        </div>
        <div className="container">
          <NavLink className="link" to="ask-question">
            <div className="form__submit">+ Ask Question</div>
          </NavLink>
        </div>
        <div className="qna ">
          {questions.map((question) => (
            <div className="qna__question" key={question._id}>
              <NavLink to={`/qna/${question._id}`} className="qna__link">
                {question.question}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default QnA;
