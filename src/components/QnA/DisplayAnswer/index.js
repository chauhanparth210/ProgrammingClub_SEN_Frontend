import React, { Component } from "react";
import Vote from "../../../asserts/vote_triangle.png";
import axios from "axios";
import { NavLink } from "react-router-dom";

class DisplayAnswer extends Component {
  state = {
    question: {
      question:
        " how to work with node.js and mongodb?how to work with node.js and mongodb?how to work with node.js and mongodb?",
      user: {
        name: "Parth Chauhan",
      },
      date: new Date(),
      id: 1,
      answers: [
        {
          answer:
            "this is why I need some time to make because i want to make it dynamic",
          date: new Date(),
          upvote: 1,
          user: {
            name: "Darshan",
          },
        },
        {
          answer:
            "this is why I need some time fsad sdfa ss de sa no beacuse I make it static that's why....",
          date: new Date(),
          upvote: 5,
          user: {
            name: "Karan",
          },
        },
        {
          answer:
            "this is why I need some time to make because i want to make it dynamic",
          date: new Date(),
          upvote: 2,
          user: {
            name: "Parth Chuahan",
          },
        },
      ],
    },
  };
  render() {
    const { question } = this.state;
    return (
      <div className="ans">
        <div className="ans__title">{question.question}</div>
        <div className="ans__button">
          <NavLink to="/qna/1/answer" style={{ textDecoration: "none" }}>
            <div className="form__submit">+ Add your answer</div>
          </NavLink>
        </div>
        <div className="ans__answers">
          {question.answers.map((ans) => (
            <>
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
                  <span>{new Date().toDateString()}</span>
                </div>
                <div style={{ fontWeight: "bold" }}>
                  <span>{": " + ans.user.name}</span>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    );
  }
}

export default DisplayAnswer;
