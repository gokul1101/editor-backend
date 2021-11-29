import React, { createContext, useState } from "react";
import LoopLogo from "../../Images/Loop1.jpg";
import { NavLink, Route, Redirect, Switch } from "react-router-dom";
import "../../Student/Main/Main.css";
import "./Main.css";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import Contests from "./Contests/Contests";
import Users from "./Users/Users";
import Leaderboard from "./Leaderboard/Leaderboard";
import CreateContest from "./Contests/CreateContest/CreateContest";
import ContestDetails from "./Contests/ContestDetails/ContestDetails";
import Quizzes from "./Quizzes/Quizzes";
import Challenges from "./Challenges/Challenges";
import CreateQuiz from "./Quizzes/CreateQuiz/CreateQuiz";
import AddQuiz from "./Quizzes/CreateQuiz/AddQuiz/AddQuiz";
const Main = (props) => {
  const [sideToggle, setSideToggle] = useState(false);
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
                to="/quizzes"
                className="nav-link dash-li"
              >
                <i className="fas fa-road pr-4 pl-4 dash-icon shake"></i>
                <span className="hide-span">Quizzes</span>
                <span className="tooltip">Quizzes</span>
              </NavLink>
            </li>
            <li className="nav-item dash-item mb-2 color-11">
              <NavLink
                activeClassName="active-class color-11"
                to="/challenges"
                className="nav-link dash-li"
              >
                <i className="fas fa-road pr-4 pl-4 dash-icon shake"></i>
                <span className="hide-span">Challenges</span>
                <span className="tooltip">Challenges</span>
              </NavLink>
            </li>
          </ul>
          <div className="sidebar-footer d-flex align-items-center justify-content-center position-relative">
            <ul className="nav flex-column w-100 side-ul">
              <li className="nav-item dash-item mb-2 color-11">
                <NavLink
                  to="/login"
                  onClick={() => {
                    props.setLogin(false);
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
              <AdminDashboard />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/contests">
              <Route path="/contests/create-contest" exact>
                <CreateContest />
              </Route>
              <Route path="/contests/details">
                <ContestDetails />
              </Route>
              <Route path="/contests" exact>
                <Contests />
              </Route>
            </Route>
            <Route path="/quizzes">
              <Route path="/quizzes/create-quiz">
                <CreateQuiz />
              </Route>
              <Route path="/quizzes/add-quiz">
                <AddQuiz />
              </Route>
              <Route path="/quizzes" exact>
                <Quizzes />
              </Route>
            </Route>
            <Route path="/challenges">
              <Challenges />
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
