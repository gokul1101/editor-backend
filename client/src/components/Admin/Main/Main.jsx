import React, { useContext, useEffect, useState } from "react";
import LoopLogo from "../../Images/Loop1.jpg";
import { NavLink, Route, Redirect, Switch } from "react-router-dom";
import "../../Student/Main/Main.css";
import "./Main.css";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import Contests from "./Contests/Contests";
import Users from "./Users/Users";
import CreateContest from "./Contests/CreateContest/CreateContest";
import ContestDetails from "./Contests/ContestDetails/ContestDetails";
import Quizzes from "./Quizzes/Quizzes";
import CreateQuiz from "./Quizzes/CreateQuiz/CreateQuiz";
import AddQuiz from "./Quizzes/CreateQuiz/AddQuiz/AddQuiz";
import { AuthContext } from "../../../contexts/AuthContext";
import ChallengeDashboard from "./Challenges/ChallengeDashboard/ChallengeDashboard";
import Report from "./Report/Report";
import ErrorLogs from "./ErrorLogs/ErrorLogs";
import CreateChallenge from "./Challenges/ChallengeDashboard/CreateChallenge/CreateChallenge";
const Main = (props) => {
  const [authState, authDispatch] = useContext(AuthContext);
  const [sideToggle] = useState(false);
  useEffect(() => {
    props.fetchUser();
    console.log(props.snackBar);
  }, []);
  return (
    <div className="container-fluid p-0">
      <div className="d-flex">
        <div
          className={`${
            sideToggle
              ? `hide-bar`
              : `side-bar d-flex flex-column align-items-center justify-content-between side-nav p-2`
          }`}
        >
          <div className="logo-sec">
            <img
              src={LoopLogo}
              alt="sidebar-logo"
              height="60"
              width="110"
              className="img-fluid position-relative sidebar-logo"
            />
          </div>
          <ul className="nav flex-column w-100 p-2 side-ul">
            <li className="nav-item dash-item mb-2 color-11">
              <NavLink
                exact
                className="nav-link dash-li"
                to="/admin-dashboard"
                activeClassName="home-active color-11"
              >
                <i className="fas fa-home pr-4 pl-4 dash-icon shake"></i>
                <span className="hide-span">Dashboard</span>
                <span className="tooltip">Dashboard</span>
              </NavLink>
            </li>
            <li className="nav-item dash-item mb-2 color-11">
              <NavLink
                activeClassName="active-class"
                to="/users"
                className="nav-link dash-li color-11"
              >
                <i className="fas fa-tasks pr-4 pl-4 dash-icon shake"></i>
                <span className="hide-span">Users</span>
                <span className="tooltip">Users</span>
              </NavLink>
            </li>
            <li className="nav-item dash-item mb-2 color-11">
              <NavLink
                activeClassName="active-class color-11"
                to="/contests"
                className="nav-link dash-li"
              >
                <i className="fas fa-trophy pr-4 pl-4 dash-icon shake"></i>
                <span className="hide-span">Contests</span>
                <span className="tooltip">Contests</span>
              </NavLink>
            </li>
            <li className="nav-item dash-item mb-2 color-11">
              <NavLink
                activeClassName="active-class color-11"
                to={`/report`}
                className="nav-link dash-li"
              >
                <i className="fas fa-road pr-4 pl-4 dash-icon shake"></i>
                <span className="hide-span">Report</span>
                <span className="tooltip">Report</span>
              </NavLink>
            </li>
            <li className="nav-item dash-item mb-2 color-11">
              <NavLink
                activeClassName="active-class color-11"
                to={`/error-logs/${authState?.user?._id}`}
                className="nav-link dash-li"
              >
                <i className="fas fa-road pr-4 pl-4 dash-icon shake"></i>
                <span className="hide-span">Error Logs</span>
                <span className="tooltip">Error Logs</span>
              </NavLink>
            </li>
          </ul>
          <div className="sidebar-footer d-flex align-items-center justify-content-center position-relative">
            <ul className="nav flex-column w-100 side-ul">
              <li className="nav-item dash-item mb-2 color-11">
                <NavLink
                  to="/login"
                  onClick={() => {
                    authDispatch({ type: "REMOVE_USER", payload: null });

                    localStorage.clear();
                  }}
                  className="nav-link dash-li"
                >
                  <i className="fas fa-sign-out-alt pr-5  dash-icon shake"></i>
                  <span
                    className="hide-span"
                    style={{ position: "relative", left: "-20px" }}
                  >
                    Logout
                  </span>
                  <span className="tooltip">Logout</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="main-div w-100">
          <Switch>
            <Route path="/admin-dashboard" exact>
              <AdminDashboard snackBar={props.snackBar} />
            </Route>
            <Route path="/users">
              <Users snackBar={props.snackBar} />
            </Route>
            <Route path="/contests">
              <Switch>
                <Route path="/contests/create-contest" exact>
                  <CreateContest
                    title="Create Contest"
                    snackBar={props.snackBar}
                  />
                </Route>
                <Route path="/contests/:id">
                  <ContestDetails snackBar={props.snackBar} />
                </Route>
                <Route path="/contests" exact>
                  <Contests snackBar={props.snackBar} />
                </Route>
              </Switch>
            </Route>
            <Route path="/quizzes">
              <Route path="/quizzes/create-quiz">
                <CreateQuiz snackBar={props.snackBar} />
              </Route>
              <Route path={`/quizzes/:id/add-question`}>
                <AddQuiz snackBar={props.snackBar} />
              </Route>
              <Route path="/quizzes" exact>
                <Quizzes snackBar={props.snackBar} />
              </Route>
            </Route>
              <Route path="/challenges">
                <Route path="/challenges/:id">
                  <ChallengeDashboard snackBar={props.snackBar} />
                </Route>
                <Route path="/challenges/:id/challenge/create">
                  <CreateChallenge snackBar={props.snackBar} />
                </Route>
              </Route>
            <Route path="/report" exact>
              <Report snackBar={props.snackBar} />
            </Route>
            <Route path="/error-logs/:id" exact>
              <ErrorLogs snackBar={props.snackBar} />
            </Route>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/admin-dashboard" />}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Main;
