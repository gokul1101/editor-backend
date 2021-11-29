import React, { useEffect } from "react";
import Male from "../../../../Images/man.png";
import { useParams, useHistory } from "react-router-dom";
import "./Quiz.css";
import QuizImage from "../../../../Images/Quiz.png";
import ProblemImage from "../../../../Images/problem.png";
// import QuizUndraw from "../../../Images/Quiz undraw.svg";

const Quiz = (props) => {
  const location = useParams();
  const history = useHistory();
  console.log(location);

  const routeQuestion = () => {
    history.push(`/codekata/${location.id}/mcq`);
  };
  const routeProgram = () => {
    history.push(`/codekata/${location.id}/program`);
  };

  useEffect(() => {
    props.setSideToggle(true);
  });

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
      <p className="text-left ml-5 dash-title-category">
        ROOM CODE : {location.id}
      </p>
      <p className="text-left ml-5 dash-title-category">QUIZZES</p>
      <div className="d-flex flex-wrap align-items-center justify-content-center">
        <div
          className="dcard mr-5 mb-5 d-flex align-items-center justify-content-center"
          onClick={routeQuestion}
        >
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="card">
            <img
              src={QuizImage}
              className="img-fluid"
              alt="Quiz-image"
              height="150px"
              width="150px"
              style={{
                position: "absolute",
                transform: "translate(50%,-115%)",
              }}
            />
            <div className="frame">
              <div className="d-flex flex-column ml-4 mt-2 pt-0">
                <span className="quiz-warm-span">Python warmup MCQ's</span>
                <span>
                  No. of questions : <b>10</b>
                </span>
              </div>
              {/* <i className="fas fa-play" onClick={routeQuestion} style={{position:'relative',top:'-100px',zIndex:999}}></i> */}
              {/* <div className="play-div" onClick={routeQuestion}>
                <div className="play" >
                  <div className="me"></div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <p className="text-left ml-5 problem-article">PROBLEMS</p>
      <div className="d-flex flex-wrap align-items-center justify-content-center">
        <div
          className="dcard mr-5 mb-5 d-flex align-items-center justify-content-center"
          onClick={routeProgram}
        >
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="card-code">
            <img
              src={ProblemImage}
              alt="Quiz-image"
              height="150px"
              width="150px"
              style={{
                position: "absolute",
                transform: "translate(50%,-115%)",
              }}
            />
            <div className="frame">
              <div className="d-flex flex-column ml-4 mt-2 pt-2">
                <span className="quiz-blue-span">Python warmup MCQ's</span>
                <span>
                  No. of que : <b>10</b>
                </span>
              </div>
              <div className="">
                <div id="play">
                  <div id="me"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
