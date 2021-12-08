import React, { useContext, useEffect } from "react";
import Male from "../../../../Images/man.png";
import { useParams, useHistory } from "react-router-dom";
import "./ContestDetails.css";
import QuizImage from "../../../../Images/Quiz.png";
import ProblemImage from "../../../../Images/problem.png";
import Timer from "../Timer/Timer";
import { AuthContext } from "../../../../../contexts/AuthContext";
import ContestCard from "./ContestCard/ContestCard";

const ContestDetails = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const [authState, authDispatch] = useContext(AuthContext);

  const routeQuestion = (question_id, type) => {
    history.push(`/codekata/${id}/${type}/${question_id}`);
  };

  useEffect(() => {
    props.setSideToggle(true);
  }, []);

  const returnBack = () => {
    history.goBack();
  };

  return (
    <div className="container-fluid dashboard">
      <div className="d-flex">
        <div className="back-btn mr-auto mt-3 ml-4" onClick={returnBack}>
          <div className="triangle"></div>
          <div className="halfcircle"></div>
        </div>
        <div className="d-flex align-items-center justify-content-center pt-4">
          <div className="timer d-flex pr-2 pl-2">
            <i class="fas fa-clock clock-icon mr-2"></i>
            <span className="timer-clock d-flex">
              : <Timer />
            </span>
          </div>
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
      <div className="d-flex mt-4 mb-2">
        <div className="d-flex mr-auto">
          <p className="text-left ml-5 dash-title-category text-dark">
            ROOM CODE :{" "}
            <span className="room-code p-2 m-2 text-white">{id}</span>
          </p>
        </div>
        <div className="create-con">
          <button className="p-2">
            <i className="fas fa-rocket pr-2 pl-2"></i>SUBMIT
          </button>
        </div>
      </div>
      <div className="d-flex">
        <div className="col-md-8">
          <p className="text-left ml-5 dash-title-category">QUIZZES</p>
          <div className="d-flex flex-wrap">
            {authState?.contest?.quizzes?.map((quiz) => {
              return (
                <ContestCard
                  key={quiz._id}
                  image={QuizImage}
                  question={quiz}
                  routeQuestion={routeQuestion}
                />
              );
            })}
          </div>
          <p className="text-left ml-5 problem-article">PROBLEMS</p>
          <div className="d-flex flex-wrap">
            {authState?.contest?.challenges?.map((problem) => {
              return (
                <ContestCard
                  key={problem._id}
                  image={ProblemImage}
                  question={problem}
                  routeQuestion={routeQuestion}
                />
              )
            })}
          </div>
        </div>
        <div className="col-md-4">
          <div class="tab-content p-2" id="pills-tabContent">
            <div className="d-flex mt-2">
              <h5 className="quiz-instruct mr-2">
                General Round – Each team - quota of 4 questions
              </h5>
            </div>
            <div className="text-justify mt-2">
              <p>There is no negative marking for wrong answer.</p>
            </div>
            <div className="instruction-div mb-2">
              <span className="quiz-instruct">Instructions :</span>
              <div className="instruction-content d-flex flex-column mt-2">
                <span className="mt-2">
                  <i class="fas fa-circle constraints-dot mr-2"></i>
                  In this round each team has its own quota of 4 questions and
                  other questions passed to it from the previous team that did
                  not answer.
                </span>
                <span className="mt-2">
                  <i class="fas fa-circle constraints-dot mr-2"></i>
                  In this round each team has its own quota of 4 questions and
                  other questions passed to it from the previous team that did
                  not answer.
                </span>
                <span className="mt-2">
                  <i class="fas fa-circle constraints-dot mr-2"></i>
                  In this round each team has its own quota of 4 questions and
                  other questions passed to it from the previous team that did
                  not answer.
                </span>
                <span className="mt-2">
                  <i class="fas fa-circle constraints-dot mr-2"></i>
                  In this round each team has its own quota of 4 questions and
                  other questions passed to it from the previous team that did
                  not answer.
                </span>
              </div>
            </div>
          </div>
          <div class="tab-content p-2" id="pills-tabContent">
            <div className="d-flex mt-2">
              <h5 className="quiz-instruct mr-2">
                General Round – Each team - quota of 4 questions
              </h5>
            </div>
            <div className="text-justify mt-2">
              <p>There is no negative marking for wrong answer.</p>
            </div>
            <div className="instruction-div mb-2">
              <span className="quiz-instruct">Instructions :</span>
              <div className="instruction-content d-flex flex-column mt-2">
                <span className="mt-2">
                  <i class="fas fa-circle constraints-dot mr-2"></i>
                  In this round each team has its own quota of 4 questions and
                  other questions passed to it from the previous team that did
                  not answer.
                </span>
                <span className="mt-2">
                  <i class="fas fa-circle constraints-dot mr-2"></i>
                  In this round each team has its own quota of 4 questions and
                  other questions passed to it from the previous team that did
                  not answer.
                </span>
                <span className="mt-2">
                  <i class="fas fa-circle constraints-dot mr-2"></i>
                  In this round each team has its own quota of 4 questions and
                  other questions passed to it from the previous team that did
                  not answer.
                </span>
                <span className="mt-2">
                  <i class="fas fa-circle constraints-dot mr-2"></i>
                  In this round each team has its own quota of 4 questions and
                  other questions passed to it from the previous team that did
                  not answer.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
