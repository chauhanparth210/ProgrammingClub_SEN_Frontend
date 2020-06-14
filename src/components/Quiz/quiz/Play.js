import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import classnames from "classnames";
import "react-toastify/dist/ReactToastify.css";

import questions from "../questions.json";
import isEmpty from "../../../utils/is-empty";

import correctNotification from "../../../asserts/audio/correct-answer.mp3";
import wrongNotification from "../../../asserts/audio/wrong-answer.mp3";
import buttonSound from "../../../asserts/audio/button-sound.mp3";
import Icon from "@mdi/react";
import { mdiLightbulbOnOutline, mdiSetCenter, mdiTimerOutline } from "@mdi/js";

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: "",
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 5,
      fiftyFifty: 2,
      usedFiftyFifty: false,
      nextButtonDisabled: false,
      previousButtonDisabled: true,
      previousRandomNumbers: [],
      time: {}
    };
    this.interval = null;
    this.correctSound = React.createRef();
    this.wrongSound = React.createRef();
    this.buttonSound = React.createRef();
  }

  componentDidMount() {
    const {
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion
    } = this.state;
    this.displayQuestions(
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion
    );
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  displayQuestions = (
    questions = this.state.questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    let { currentQuestionIndex } = this.state;
    if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState(
        {
          currentQuestion,
          nextQuestion,
          previousQuestion,
          numberOfQuestions: questions.length,
          answer,
          previousRandomNumbers: []
        },
        () => {
          this.showOptions();
          this.handleDisableButton();
        }
      );
    }
  };

  handleOptionClick = e => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      this.correctTimeout = setTimeout(() => {
        this.correctSound.current.play();
      }, 500);
      this.correctAnswer();
    } else {
      this.wrongTimeout = setTimeout(() => {
        this.wrongSound.current.play();
      }, 500);
      this.wrongAnswer();
    }
  };

  handleNextButtonClick = () => {
    this.playButtonSound();
    if (this.state.nextQuestion !== undefined) {
      this.setState(
        prevState => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handlePreviousButtonClick = () => {
    this.playButtonSound();
    if (this.state.previousQuestion !== undefined) {
      this.setState(
        prevState => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handleQuitButtonClick = () => {
    this.playButtonSound();
    if (window.confirm("Are you sure you want to quit?")) {
      this.props.history.push("/");
    }
  };

  handleButtonClick = e => {
    switch (e.target.id) {
      case "next-button":
        this.handleNextButtonClick();
        break;

      case "previous-button":
        this.handlePreviousButtonClick();
        break;

      case "quit-button":
        this.handleQuitButtonClick();
        break;

      default:
        break;
    }
  };

  playButtonSound = () => {
    this.buttonSound.current.play();
  };

  correctAnswer = () => {
    toast("Correct Answer!", {
      type: toast.TYPE.SUCCESS
    });
    // M.toast({
    //   html: "Correct Answer!",
    //   classes: "toast-valid",
    //   displayLength: 1500
    // });
    this.setState(
      prevState => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  wrongAnswer = () => {
    navigator.vibrate(1000);
    toast("Wrong Answer!", {
      type: toast.TYPE.ERROR
    });
    // M.toast({
    //   html: "Wrong Answer!",
    //   classes: "toast-invalid",
    //   displayLength: 1500
    // });
    this.setState(
      prevState => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  showOptions = () => {
    const options = Array.from(document.querySelectorAll(".option"));

    options.forEach(option => {
      option.style.visibility = "visible";
    });

    this.setState({
      usedFiftyFifty: false
    });
  };

  handleHints = () => {
    if (this.state.hints > 0) {
      const options = Array.from(document.querySelectorAll(".option"));
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });

      while (true) {
        const randomNumber = Math.round(Math.random() * 3);
        if (
          randomNumber !== indexOfAnswer &&
          !this.state.previousRandomNumbers.includes(randomNumber)
        ) {
          options.forEach((option, index) => {
            if (index === randomNumber) {
              option.style.visibility = "hidden";
              this.setState(prevState => ({
                hints: prevState.hints - 1,
                previousRandomNumbers: prevState.previousRandomNumbers.concat(
                  randomNumber
                )
              }));
            }
          });
          break;
        }
        if (this.state.previousRandomNumbers.length >= 3) break;
      }
    }
  };

  handleFiftyFifty = () => {
    if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
      const options = document.querySelectorAll(".option");
      const randomNumbers = [];
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });

      let count = 0;
      do {
        const randomNumber = Math.round(Math.random() * 3);
        if (randomNumber !== indexOfAnswer) {
          if (
            randomNumbers.length < 2 &&
            !randomNumbers.includes(randomNumber) &&
            !randomNumbers.includes(indexOfAnswer)
          ) {
            randomNumbers.push(randomNumber);
            count++;
          } else {
            while (true) {
              const newRandomNumber = Math.round(Math.random() * 3);
              if (
                !randomNumbers.includes(newRandomNumber) &&
                newRandomNumber !== indexOfAnswer
              ) {
                randomNumbers.push(newRandomNumber);
                count++;
                break;
              }
            }
          }
        }
      } while (count < 2);

      options.forEach((option, index) => {
        if (randomNumbers.includes(index)) {
          option.style.visibility = "hidden";
        }
      });
      this.setState(prevState => ({
        fiftyFifty: prevState.fiftyFifty - 1,
        usedFiftyFifty: true
      }));
    }
  };

  startTimer = () => {
    const countDownTime = Date.now() + 180000;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(this.interval);
        this.setState(
          {
            time: {
              minutes: 0,
              seconds: 0
            }
          },
          () => {
            this.endGame();
          }
        );
      } else {
        this.setState({
          time: {
            minutes,
            seconds,
            distance
          }
        });
      }
    }, 1000);
  };

  handleDisableButton = () => {
    if (
      this.state.previousQuestion === undefined ||
      this.state.currentQuestionIndex === 0
    ) {
      this.setState({
        previousButtonDisabled: true
      });
    } else {
      this.setState({
        previousButtonDisabled: false
      });
    }

    if (
      this.state.nextQuestion === undefined ||
      this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions
    ) {
      this.setState({
        nextButtonDisabled: true
      });
    } else {
      this.setState({
        nextButtonDisabled: false
      });
    }
  };

  endGame = () => {
    alert("Quiz has eneded!");
    const { state } = this;
    const playerStats = {
      score: state.score,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      fiftyFiftyUsed: 2 - state.fiftyFifty,
      hintsUsed: 5 - state.hints
    };
    setTimeout(() => {
      this.props.history.push("/play/quizSummary", playerStats);
    }, 1000);
  };

  render() {
    const {
      currentQuestion,
      currentQuestionIndex,
      fiftyFifty,
      hints,
      numberOfQuestions,
      time
    } = this.state;

    return (
      <div className="playpage font">
        <ToastContainer autoClose={3000} />
        <Fragment>
          <Helmet>
            <title>Quiz Page</title>
          </Helmet>
          <Fragment>
            <audio ref={this.correctSound} src={correctNotification} />
            <audio ref={this.wrongSound} src={wrongNotification} />
            <audio ref={this.buttonSound} src={buttonSound} />
          </Fragment>
          <div className="questions">
            <h1 style={{ textAlign: "center" }}>Quiz Mode</h1>
            <div className="lifeline-container">
              <p>
                <span onClick={this.handleFiftyFifty} className="lifeline-icon" style={{ fontSize: "1.8rem" }}>
                  <Icon path={mdiSetCenter} size={1} />
                  <span className="lifeline">{fiftyFifty}</span>
                </span>
              </p>
              <p>
                <span onClick={this.handleHints} className="lifeline-icon" style={{ fontSize: "1.8rem" }}>
                  <Icon path={mdiLightbulbOnOutline} size={1} />
                  <span className="lifeline">{hints}</span>
                </span>
              </p>
            </div>
            <div className="timer-container">
              <p>
                <span className="left" style={{ float: "left",fontSize: "1.8rem" }}>
                  {currentQuestionIndex + 1} of {numberOfQuestions}
                </span>
                <div className="timer">
                  <span className="counter">
                    {time.minutes}:{time.seconds}
                    <Icon path={mdiTimerOutline} size={1.8} />
                  </span>
                </div>
              </p>
            </div>
            <h1 style={{ textAlign: "center" }}>{currentQuestion.question}</h1>
            <div className="options-container">
              <p onClick={this.handleOptionClick} className="option" style={{ fontSize: "1.8rem"}}>
                {currentQuestion.optionA}
              </p>
              <p onClick={this.handleOptionClick} className="option" style={{ fontSize: "1.8rem"}}>
                {currentQuestion.optionB}
              </p>
            </div>
            <div className="options-container">
              <p onClick={this.handleOptionClick} className="option" style={{ fontSize: "1.8rem"}}>
                {currentQuestion.optionC}
              </p>
              <p onClick={this.handleOptionClick} className="option" style={{ fontSize: "1.8rem"}}>
                {currentQuestion.optionD}
              </p>
            </div>

            <div className="button-container">
              <button
                className={classnames("", {
                  disable: this.state.previousButtonDisabled
                })}
                style={{ fontSize: "1.5rem", width:"15%"}}
                id="previous-button"
                onClick={this.handleButtonClick}
              >
                Previous
              </button>
              <button
                className={classnames("", {
                  disable: this.state.nextButtonDisabled
                })}
                id="next-button"
                style={{ fontSize: "1.5rem"}}
                onClick={this.handleButtonClick}
              >
                Next
              </button>
              <button
                className="QuizButtons"
                id="quit-button"
                style={{ fontSize: "1.5rem"}}
                onClick={this.handleButtonClick}
              >
                Quit
              </button>
            </div>
          </div>
        </Fragment>
      </div>
    );
  }
}

export default Play;
