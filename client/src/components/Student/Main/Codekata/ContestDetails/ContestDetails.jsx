import React, { useContext, useEffect } from "react";
import Male from "../../../../Images/man.png";
import { useParams, useHistory } from "react-router-dom";
import "./ContestDetails.css";
import QuizImage from "../../../../Images/Quiz.png";
import ProblemImage from "../../../../Images/problem.png";
import Timer from "../Timer/Timer";
import { AuthContext } from "../../../../../contexts/AuthContext";
import ContestCard from "./ContestCard/ContestCard";
import helperService from "../../../../../services/helperService";

const ContestDetails = ({ setSideToggle }) => {
  const { id } = useParams();
  const history = useHistory();
  const [authState] = useContext(AuthContext);
  const routeQuestion = (_id, name, type) => {
    const checkQuestion = (question) => question === name;
    if (type === "problem") {
      let completedChallenges = JSON.parse(
        localStorage.getItem("problems") || "[]"
      );
      if (completedChallenges.some(checkQuestion)) {
        return;
      }
    } else {
      let completedQuizzes = JSON.parse(
        localStorage.getItem("quizzes") || "[]"
      );
      if (completedQuizzes.some(checkQuestion)) {
        return;
      }
    }
    history.push(`/codekata/${id}/${type}/${_id}`);
  };
  const sumbitContest = async () => {
    let payload = {
      user_id: authState?.user?._id,
      contest_id: authState?.contest?.contest_id,
    };
    let contestQuizzes = authState?.contest?.quizzes || [];
    let contestChallenges = authState?.contest?.challenges || [];
    payload.quizzes = contestQuizzes.map((quiz) => {
      return JSON.parse(localStorage.getItem(quiz?.name) || "[]");
    });
    payload.challenges = contestChallenges.map((challenge) => {
      return JSON.parse(localStorage.getItem(challenge?.name) || "[]");
    });
    try {
      const response = await helperService.createSubmission(
        { ...payload },
        { headers: { Authorization: authState.user.token } }
      );
      console.log(response);
      // history.push("/codekata");
    } catch(err) {
      
    }
  };
  useEffect(() => {
    setSideToggle(true);
   
  }, [setSideToggle]);

  return (
    <div className="container-fluid dashboard">
      <div className="d-flex">
        <div
          className="back-btn mr-auto mt-3 ml-4"
          onClick={() => history.push("/codekata")}
        >
          <div className="triangle"></div>
          <div className="halfcircle"></div>
        </div>
        <div className="timer mt-4">
          <Timer />
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
      <div className="d-flex justify-content-between p-2 m-2">
      <div className="challenge-name ml-4 font-weight-bolder">
      <h1>Saturday Challenge</h1>
      </div>
      <div className="mt-3 p-2">
        <h3 className="font-weight-bolder color-highlight"><i class="fas fa-star"></i>Max Score : <span className="max-score p-2">40</span></h3>
      </div>
      </div>
      <div className="d-flex mt-4 mb-2">
       
        <div className="d-flex mr-auto">
          <p className="text-left ml-5 dash-title-category text-dark">
            ROOM CODE :{" "}
            <span className="room-code p-2 m-2 text-white">{id}</span>
          </p>
        </div>
        <button className="btn-hover color-11 mt-4 p-2" onClick={sumbitContest}>
          SUBMIT CONTEST<i className="fas fa-rocket mr-2 ml-2"></i>
        </button>
      </div>
      <div className="d-flex">
      <div
          className="col-md-5"
          style={{ height: "80vh", overflowY: "scroll" }}
        >
          <div className="tab-content p-2" id="pills-tabContent">
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
                  <i className="fas fa-circle constraints-dot mr-2"></i>
                  In this round each team has its own quota of 4 questions and
                  other questions passed to it from the previous team that did
                  not answer.
                </span>
                <span className="mt-2">
                  <i className="fas fa-circle constraints-dot mr-2"></i>
                  In this round each team has its own quota of 4 questions and
                  other questions passed to it from the previous team that did
                  not answer.
                </span>
              
                <span className="mt-2">
                  <i className="fas fa-circle constraints-dot mr-2"></i>
                  In this round each team has its own quota of 4 questions and
                  other questions passed to it from the previous team that did
                  not answer.
                </span>
              </div>
            </div>
          </div>
          <div className="tab-content p-2" id="pills-tabContent">
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
                  <i className="fas fa-circle constraints-dot mr-2"></i>
                  In this round each team has its own quota of 4 questions and
                  other questions passed to it from the previous team that did
                  not answer.
                </span>
                <span className="mt-2">
                  <i className="fas fa-circle constraints-dot mr-2"></i>
                  In this round each team has its own quota of 4 questions and
                  other questions passed to it from the previous team that did
                  not answer.
                </span>
                <span className="mt-2">
                  <i className="fas fa-circle constraints-dot mr-2"></i>
                  In this round each team has its own quota of 4 questions and
                  other questions passed to it from the previous team that did
                  not answer.
                </span>
                <span className="mt-2">
                  <i className="fas fa-circle constraints-dot mr-2"></i>
                  In this round each team has its own quota of 4 questions and
                  other questions passed to it from the previous team that did
                  not answer.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-md-7"
          style={{ height: "80vh", overflowY: "scroll" }}
        >
          {authState.contest.quizzes.length === 0 ? (
            <></>
          ) : (
            <div className="quiz-card">
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
            </div>
          )}
          {authState.contest.challenges.length === 0 ? (
            <></>
          ) : (
            <div className="challenge-card">
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
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default ContestDetails;
