import React, { useEffect, useState } from "react";
import "./Quiz.css";
import { useParams, useHistory } from "react-router-dom";
import TimerImg from "../../../../../Images/timer.png";
import Male from "../../../../../Images/man.png";
import Timer from "../../Timer/Timer";
import { useContext } from "react";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import helperService from "../../../../../../services/helperService";
const Quiz = ({ setSideToggle }) => {
  const location = useParams();
  const history = useHistory();
  const [authState, authDisaptch] = useContext(AuthContext);
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  let [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  let [currentQuestion, setCurrentQuestion] = useState({});
  const [status, setStatus] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const initComponent = async () => {
    setQuiz(
      authState?.contest?.quizzes.find(
        (quiz) => quiz._id === location.questionId
      )
    );
    setSideToggle(true);
    let [mcqs] = await getQuestions();
    setCurrentQuestion(mcqs);
    setCurrentQuestionNumber(currentQuestionNumber + 1);
  };
  const getQuestions = async () => {
    try {
      const {
        status,
        data: { mcqs },
      } = await helperService.getQuizQuestions(
        { id: location.questionId, page: currentQuestionNumber + 1 },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 200) {
        setQuestions([...questions, ...mcqs]);
        return mcqs;
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(async () => {
    await initComponent();
  }, []);
  let isLast = currentQuestionNumber === quiz?.total_mcqs;
  const handleNext = async () => {
    if (!status) return;
    if (!isLast) {
      let [mcqs] = await getQuestions();
      setCurrentQuestion(mcqs);
      setCurrentQuestionNumber(currentQuestionNumber + 1);
    }
    setStatus(false);
    setSelectedAnswer("");
  };
  const answerHandler = (ans) => {
    setSelectedAnswer(ans);
    setStatus(true);
  };
  
  return (
    <div className="container-fluid p-0 Quiz-question-container">
      <div className="d-flex">
        <div
          className="back-btn mr-auto mt-3 ml-4"
          onClick={() => history.goBack()}
        >
          <div className="triangle"></div>
          <div className="halfcircle"></div>
        </div>
        <div className="user-info position-relative">
          <div className="d-flex mx-4 pt-3 user-det justify-content-end">
            <div className="gender-info mr-3">
              <img src={Male} alt="male" height="50" width="50" />
            </div>
            <div className="user-profile d-flex flex-column">
              <span className="user-name">{authState?.user?.name}</span>
              <span className="register-no">{authState?.user?.regno}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex p-2" style={{ marginTop: "40px" }}>
        <div className="col-md-8 p-3 pl-5">
          <p className="text-left dash-title-category">
            ROOM CODE : {location.id}
          </p>
          <p className="text-left problem-article">{quiz?.name}</p>
          <div className="col p-0">
            <div className="col question-outoff p-0">
              <span className="question-order p-2 bg-dark text-white">
                Question {currentQuestionNumber || 0}/
                {quiz?.total_mcqs || 0}
              </span>
            </div>
            <div className="hr">
              <hr className="co p-0l" />
            </div>
            <div className="col question-outoff p-0 mb-3">
              <span className="text-muted">
                Note: Choosen answer boxes are turned into Green color
              </span>
            </div>
          </div>
          <div className="d-flex flex-column quizzes pt-4 pb-4">
            <div className="d-flex">
              <div className="numberCircle ml-3">
                {currentQuestionNumber}
              </div>
              <div className="question-up ml-3">
                <span className="span-question font-weight-bolder">
                  {currentQuestion.statement}
                </span>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center mt-3">
              <div className="d-flex p-2 w-100 individual-question flex-wrap">
                {Object.values(currentQuestion?.options || []).map(
                  (option, id) => {
                    return (
                      <button
                        key={id}
                        className={`${
                          status && selectedAnswer === option
                            ? `correct-option text-left p-2 m-2`
                            : `option-1 text-left p-2 m-2 individual-options`
                        }`}
                        onClick={() => answerHandler(option)}
                      >
                        {option}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
            {!isLast ? (
              <div className="mt-2 d-flex justify-content-end mr-4">
                <button
                  className="mr-2 btn-hover pr-1 pl-1 color-11"
                  color="primary"
                  variant="contained"
                  onClick={handleNext}
                  disabled={isLast}
                >
                  Next
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div className="col-md-4">
          <div className="d-flex flex-column">
            <div className="d-flex flex-column quizzes align-items-center justify-content-center mt-2 mb-2 p-3">
              <img
                src={TimerImg}
                alt="timer"
                height="100"
                width="100"
                className="img-fluid mt-2"
              />
              <span className="text-left dash-title-category">Timer</span>
              <h2 className="timer-text">
                <Timer />
              </h2>
              <p className="font-weight-bolder">remaining</p>
              <div className="d-flex">
                <span className="timer-hand mr-2 ml-3 font-weight-bolder">
                  Hours
                </span>
                <span className="timer-hand mr-2 font-weight-bolder">
                  Minutes
                </span>
                <span className="timer-hand mr-2 font-weight-bolder">
                  Seconds
                </span>
              </div>
            </div>
            <div
              className="d-flex mt-2 mb-2 p-3 flex-column align-items-center quizzes"
              style={{ height: "300px", overflowY: "scroll" }}
            >
              <span className="span-question mt-2 mb-3">Question Path</span>
              <div className="d-flex flex-wrap">
                {Array.apply(0, Array(quiz?.total_mcqs || 0)).map((x, i) => {
                  return (
                    <button
                      className={`${
                        currentQuestionNumber-1 === i
                          ? `correct ml-3 mb-2 text-center`
                          : `que-path ml-3 mb-3 text-center`
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="d-flex justify-content-end mt-2">
              <button
                className="mr-2 btn-hover pr-1 pl-1 color-11"
                color="primary"
                variant="contained"
                onClick={handleNext}
              >
                SUBMIT QUIZ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
