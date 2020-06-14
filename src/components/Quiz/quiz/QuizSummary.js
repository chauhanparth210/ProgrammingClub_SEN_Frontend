import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiCheckOutline } from "@mdi/js";

class QuizSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hintsUsed: 0,
      fiftyFiftyUsed: 0
    };
  }

  componentDidMount() {
    const { state } = this.props.location;
    if (state) {
      this.setState({
        score: (state.score / state.numberOfQuestions) * 100,
        numberOfQuestions: state.numberOfQuestions,
        numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
        correctAnswers: state.correctAnswers,
        wrongAnswers: state.wrongAnswers,
        hintsUsed: state.hintsUsed,
        fiftyFiftyUsed: state.fiftyFiftyUsed
      });
    }
  }

  render() {
    const { state } = this.props.location;
    let stats, remark;
    const userScore = this.state.score;

    if (userScore <= 30) {
      remark = "You need more practice!";
    } else if (userScore > 30 && userScore <= 50) {
      remark = "Better luck next time!";
    } else if (userScore <= 70 && userScore > 50) {
      remark = "You can do better!";
    } else if (userScore >= 71 && userScore <= 84) {
      remark = "You did great!";
    } else {
      remark = "You're an absolute genius!";
    }

    if (state !== undefined) {
      stats = (
        <Fragment>
          <div style={{ textAlign: "center" }} className="font">
            <Icon path={mdiCheckOutline} size={5} />
          </div>
          <h1>Quiz has ended</h1>
          <div className="stats font">
            <h2>{remark}</h2>
            <br/>
            <h1>Your Score: {this.state.score.toFixed(0)}&#37;</h1>
            <div style={{fontSize:"medium"}}>
            <span className="stat left">Total number of questions: </span>
            <span className="stat right">{this.state.numberOfQuestions}</span>
            <br />
            <span className="stat left">Number of attempted questions: </span>
            <span className="stat right">
              {this.state.numberOfAnsweredQuestions}
            </span>
            <br />
            <span className="stat left">Number of Correct Answers: </span>
            <span className="stat right">{this.state.correctAnswers}</span>{" "}
            <br />
            <span className="stat left">Number of Wrong Answers: </span>
            <span className="stat right">{this.state.wrongAnswers}</span>
            <br />
            <span className="stat left">Hints Used: </span>
            <span className="stat right">{this.state.hintsUsed}</span>
            <br />
            <span className="stat left">50-50 Used: </span>
            <span className="stat right">{this.state.fiftyFiftyUsed}</span>
            </div>
          </div>
          <section className="buttons">
            <ul>
              <li>
                <Link to="/play/quiz">Play Again</Link>
              </li>
              <li>
                <Link to="/">Back to Home</Link>
              </li>
            </ul>
          </section>
        </Fragment>
      );
    } else {
      stats = (
        <section>
          <h1 className="no-stats">No Statistics Available</h1>
          <ul>
            <li>
              <Link to="/play/quiz">Take a Quiz</Link>
            </li>
            <li>
              <Link to="/">Back to Home</Link>
            </li>
          </ul>
        </section>
      );
    }
    return (
      <div className="summpage">
        <Fragment>
          <Helmet>
            <title>Quiz App - Summary</title>
          </Helmet>
          <div className="quiz-summary">{stats}</div>
        </Fragment>
      </div>
    );
  }
}

export default QuizSummary;
