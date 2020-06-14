import React, { Component } from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../utils/constants";

class QnA extends Component {
  state = {
    questions: [],
    filteredList: []
  };

  componentDidMount() {
    axios.get(`${SERVER_URL}/question`).then((questions) => {
      const { data } = questions;
      // console.log(data);
      this.setState({
        questions: data.question,
        filteredList: data.question
      });
    });
  }
  changeHandler = e => {
    let currentList = [];
    let newList = [];
    console.log(e.target.value);
    if (e.target.value !== "") {
      currentList = this.state.filteredList;
      newList = currentList.filter(item => {
        const itemLC = item.question.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return itemLC.includes(filter);
      });
    } else {
      newList = this.state.filteredList;
    }
    this.setState({ questions: newList });
  };

  render() {
    const { questions } = this.state;
    console.log(questions);
    return (
      <div className="qna">
        <div className="qna__title">
          <div className="qna__title--text">Question & Answer</div>
        </div>
        <input
          className="form__input padding-up container"
          type="text"
          placeholder="Search..."
          onChange={this.changeHandler}
          

        />
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
