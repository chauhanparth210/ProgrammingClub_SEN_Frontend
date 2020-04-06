import React, { Component } from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";

class QnA extends Component {
  state = {
    questions: [
      {
        question:
          "how to work with node.js and mongodb?how to work with node.js and mongodb?how to work with node.js and mongodb?",
        id: 1,
      },
      {
        question: "how to work with React.js and firebase?",
        id: 12,
      },
      {
        question: "how to work with MERN Stack?",
        id: 13,
      },
      {
        question:
          "how to work with node.js and mongodb?how to work with node.js and mongodb?how to work with node.js and mongodb?",
        id: 14,
      },
      {
        question: "how to work with React.js and firebase?",
        id: 15,
      },
    ],
  };
  render() {
    const { questions } = this.state;
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
            <div className="qna__question">
              <NavLink to={`/qna/${question.id}`} className="qna__link">
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
