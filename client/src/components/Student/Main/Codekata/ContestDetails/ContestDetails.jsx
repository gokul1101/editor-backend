import React, { useContext, useEffect, useRef, useState } from "react";
import Male from "../../../../Images/man.png";
import { useParams, useHistory } from "react-router-dom";
import "./ContestDetails.css";
import QuizImage from "../../../../Images/Quiz.png";
import ProblemImage from "../../../../Images/problem.png";
import Timer from "../Timer/Timer";
import { AuthContext, useLoader } from "../../../../../contexts/AuthContext";
import ContestCard from "./ContestCard/ContestCard";
import helperService from "../../../../../services/helperService";
import CustomButton from "../../../../Reducer/CustomButton/CustomButton";
import DialogBox from "../../../../Reducer/DialogBox/DialogBox";

const ContestDetails = ({ setSideToggle }) => {
  const [loader, showLoader, hideLoader] = useLoader();
  const { id } = useParams();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const handleOpen = () => setOpen(true);
  const backAlert = () => setFlag(true);
  const onBackAlert = () => {
    history.push("/codekata");
  };
  const handleClose = () => setOpen(false);
  const backClose = () => setFlag(false);
  const ref = useRef();
  const [authState] = useContext(AuthContext);
  const routeQuestion = (_id, name, type) => {
    const checkQuestion = (question) => question === name;
    if (type === "problem") {
      let completedChallenges = JSON.parse(
        localStorage.getItem("challenges") || "[]"
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
  const sumbitContest = async (e) => {
    setOpen(false);
    showLoader();
    let payload = {
      user_id: authState?.user?._id,
      contest_id: authState?.contest?.contest._id,
    };
    let contestQuizzes = authState?.contest?.quizzes || [];
    let contestChallenges = authState?.contest?.challenges || [];
    payload.quizzes = contestQuizzes.map((quiz) => {
      return JSON.parse(localStorage.getItem(quiz?.name) || "[]");
    });
    payload.challenges = contestChallenges.map((challenge) => {
      return JSON.parse(localStorage.getItem(challenge?.name) || "{}");
    });
    try {
      const response = await helperService.createSubmission(
        { ...payload },
        { headers: { Authorization: authState.user.token } }
      );
      console.log(response);
      // history.push("/codekata");
    } catch (err) {
      console.log(err);
    } finally {
      hideLoader();
    }
  };
  useEffect(() => {
    setSideToggle(true);
    // console.log(ref.current);
    // if (ref.current.focus) {
    //   ref.current.dispatchEvent(
    //     new KeyboardEvent("keypress", {
    //       key: "F11",
    //     })
    //   );
    // }
    // console.log(full);

    // return () => {};
    // window.addEventListener("onload", () => {});
  }, [setSideToggle]);

  const handleUserKeyPress = (event) => {
    const { key, keyCode } = event;
    console.log(key);
    if (keyCode === 122) {
      console.log("triggered");
    }
  };
  return (
    <div
      className="container-fluid dashboard"
      ref={ref}
      style={{ overflow: "hidden" }}
    >
      {loader}
      <div className="d-flex">
        <div className="back-btn mr-auto mt-3 ml-4" onClick={backAlert}>
          <div className="triangle"></div>
          <div className="halfcircle"></div>
        </div>
        <DialogBox
          open={flag}
          bodyMsg={`Are you sure do you want to Go Back`}
          handleClose={backClose}
          handleOpen={onBackAlert}
        />
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
      <div className="d-flex justify-content-between p-0 mt-2">
        <div className="challenge-name ml-4 font-weight-bolder">
          <h1>{authState?.contest?.contest.name}</h1>
        </div>
        <div className="mt-3 p-2">
          <h3 className="font-weight-bolder color-highlight">
            <i className="fas fa-star"></i>Max Score :{" "}
            <span className="max-score p-2">{40}</span>
          </h3>
        </div>
      </div>
      <div className="d-flex mt-1 mb-1">
        <div className="d-flex mr-auto">
          <p className="text-left ml-4 dash-title-category text-dark">
            ROOM CODE :{" "}
            <span className="room-code p-2 m-2 text-white">{id}</span>
          </p>
        </div>
        <CustomButton
          className="btn-hover color-11 mt-2"
          onClickHandler={handleOpen}
        >
          <i className="fas fa-rocket pr-2 pl-2"></i> SUBMIT CONTEST
        </CustomButton>
        <DialogBox
          open={open}
          headerMsg={"This is a warning message !"}
          bodyMsg={`Are you sure do you want to exit from the ${authState?.contest?.contest.name}`}
          handleClose={handleClose}
          handleOpen={sumbitContest}
        />
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
          style={{ height: "75vh", overflowY: "scroll" }}
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
