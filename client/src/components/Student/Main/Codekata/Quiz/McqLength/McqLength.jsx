import React, { useEffect, useState } from "react";
import "./McqLength.css";
import { useParams, useHistory } from "react-router-dom";
import Timer from "../../../../../Images/timer.png";
import Male from "../../../../../Images/man.png";
const Mcq = (props) => {
  const location = useParams();
  const history = useHistory();
  useEffect(() => {
    props.setSideToggle(true);
  });
  const returnBack = () => {
    history.goBack();
  };
  let [currentQuestion, setCurrentQuestion] = useState(0);
  const [status, setStatus] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const questions = [
    {
      questionText: "who is richest person in the world?",
      answerOptions: {
        A: "Jeff Bezons",
        B: "Elon Musk",
        C: "Mukesh Ambani",
        D: "Warren Buffett",
      },
      correctAnswer: "Elon Musk",
    },
    {
      questionText: "World pana kaarar yaar ?",
      answerOptions: {
        A: "Vijay Rupani",
        B: "Manmohan singh",
        C: "Narendra Modi",
        D: "Deep Patel",
      },
      correctAnswer: "Elon Musk",
    },
    {
      questionText: "Who is CEO of Tata?",
      answerOptions: {
        A: "Jeff Bezos",
        B: "Ratan Tata",
        C: "Mukesh Ambani",
        D: "Gautam Adani",
      },
      correctAnswer: "Elon Musk",
    },
    {
      questionText: "how many countries in the world?",
      answerOptions: {
        A: "238",
        B: "237",
        C: "299",
        D: "123",
      },
      correctAnswer: "372",
    },
  ];

  const questionChange = (currQue) => {
    console.log(currQue);
    setCurrentQuestion(currQue);
  };

  const handleNext = () => {
    // if (isCorrect === true) {
    //   setScore(score + 1);
    // }
    const nextQuetions = currentQuestion + 1;
    if (nextQuetions < questions.length) {
      setCurrentQuestion(nextQuetions);
    }
    // else {
    //   setShowScore(true);
    // }
  };
  const handlePrevious = () => {
    const nextQuetions = currentQuestion - 1;
    if (nextQuetions < questions.length && currentQuestion !== 0) {
      setCurrentQuestion(nextQuetions);
    }
  };

  const answerHandler = (ans) => {
    console.log(ans);
    setSelectedAnswer(ans);
    setStatus(true);
  };
  return (
    <div className="container-fluid p-0 Quiz-question-container">
      <div className="d-flex">
        <div class="back-btn mr-auto mt-3 ml-4" onClick={returnBack}>
          <div class="triangle"></div>
          <div class="halfcircle"></div>
        </div>
        <div className="user-info position-relative">
          <div className="d-flex mx-4 pt-3 user-det justify-content-end">
            <div className="gender-info mr-3">
              <img src={Male} alt="male" height="50" width="50" />
            </div>
            <div className="user-profile d-flex flex-column">
              <span className="user-name">Dhanush Karthick S</span>
              <span className="register-no">1813015</span>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex p-2" style={{ marginTop: "40px" }}>
        <div className="col-md-8 p-3 pl-5">
          <p className="text-left dash-title-category">
            ROOM CODE : {location.id}
          </p>
          <p className="text-left problem-article">Python warmup MCQ's</p>
          <div className="col p-0">
            <div className="col question-outoff p-0">
              <span className="question-order">
                Question {currentQuestion + 1}/{questions.length}
              </span>
            </div>
            <div className="hr">
              <hr className="co p-0l" />
            </div>
            <div className="col question-outoff p-0 mb-3">
              <span>
                Note: Choosen answer boxes are turned into Green color
              </span>
            </div>
          </div>
          <div className="d-flex flex-column quizzes pt-4 pb-4">
            <div className="d-flex">
              <div class="numberCircle ml-3">{currentQuestion + 1}</div>
              <div className="question-up ml-3">
                <span className="span-question">
                  {questions[currentQuestion].questionText}
                </span>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center mt-3">
              <div className="d-flex p-2 w-100 flex-wrap">
                {Object.values(questions[currentQuestion].answerOptions).map(
                  (answerOptions, id) => {
                    return (
                      <button
                        key={id}
                        className={`${
                          status && selectedAnswer === answerOptions
                            ? `correct-option text-left pr-2 pl-3 pt-2 pb-2 m-2`
                            : `option-1 text-left pr-2 pl-3 pt-2 pb-2 m-2`
                        }`}
                        onClick={() => answerHandler(answerOptions)}
                      >
                        {answerOptions}
                      </button>
                    );
                  }
                )}
              </div>
              <div className="d-flex mt-2">
                <button
                  className="mr-2 btn-hover pr-1 pl-1 color-11"
                  color="primary"
                  variant="contained"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
                <button
                  className="mr-2 btn-hover pr-1 pl-1 color-11"
                  color="primary"
                  variant="contained"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="d-flex flex-column">
            <div className="d-flex flex-column quizzes align-items-center justify-content-center mt-2 mb-2 p-3">
              <img
                src={Timer}
                alt="timer"
                height="100"
                width="100"
                className="img-fluid mt-2"
              />
              <span className="text-left dash-title-category">Timer</span>
              <h2 className="timer-text">00.15.00</h2>
              <p>remaining</p>
              <div className="d-flex">
                <span className="timer-hand mr-2 ml-3">Hours</span>
                <span className="timer-hand mr-2">Minutes</span>
                <span className="timer-hand mr-2">Seconds</span>
              </div>
            </div>
            <div className="d-flex mt-2 mb-2 p-3 flex-column align-items-center quizzes">
              <span className="span-question mt-2 mb-3">Question Path</span>
              <div className="d-flex flex-wrap">
                {Array.apply(0, Array(questions.length)).map(function (x, i) {
                  return (
                    <button
                      className={`${
                        currentQuestion === i
                          ? `correct ml-3 mb-2`
                          : `que-path ml-3 mb-3`
                      }`}
                      onClick={() => questionChange(i)}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mcq;
