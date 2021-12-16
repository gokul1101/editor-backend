import React, { useState, useContext, useEffect } from "react";
import { NavLink, Route, Redirect, Switch } from "react-router-dom";
import "./Main.css";
import LoopLogo from "../../Images/Loop1.jpg";
import { Avatar } from "@material-ui/core";
import Dashboard from "./Dashboard/Dashboard";
import Codekata from "./Codekata/Codekata";
import Articles from "./Articles/Articles";
import Roadmap from "./Roadmap/Roadmap";
import Profile from "./Profile/Profile";
import Compiler from "./Compiler/Compiler";
import { AuthContext } from "../../../contexts/AuthContext";
import Programs from "./Codekata/ContestDetails/Programs/Programs";
import Quiz from "./Codekata/ContestDetails/Quiz/Quiz";
import ContestDetails from "./Codekata/ContestDetails/ContestDetails";
const Main = (props) => {
  const [authState, authDispatch] = useContext(AuthContext);
  const [sideToggle, setSideToggle] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user") && !authState.user.regno)
      props.fetchUser();
  }, []);
  return (
    <div className="conatiner-fluid w-100">
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
                to="/dashboard"
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
                to="/codekata"
                className="nav-link dash-li color-11"
              >
                <i className="fas fa-tasks pr-4 pl-4 dash-icon shake"></i>
                <span className="hide-span">Codekata</span>
                <span className="tooltip">Codekata</span>
              </NavLink>
            </li>
            <li className="nav-item dash-item mb-2 color-11">
              <NavLink
                activeClassName="active-class color-11"
                to="/articles"
                className="nav-link dash-li"
              >
                <i className="fas fa-trophy pr-4 pl-4 dash-icon shake"></i>
                <span className="hide-span">Articles</span>
                <span className="tooltip">Articles</span>
              </NavLink>
            </li>
            <li className="nav-item dash-item mb-2 color-11">
              <NavLink
                activeClassName="active-class color-11"
                to="/roadmap"
                className="nav-link dash-li"
              >
                <i className="fas fa-road pr-4 pl-4 dash-icon shake"></i>
                <span className="hide-span">Roadmap</span>
                <span className="tooltip">Roadmap</span>
              </NavLink>
            </li>
            <li className="nav-item mb-2 dash-item mb-2 color-11">
              <NavLink
                activeClassName="active-class color-11"
                to="/compiler"
                className="nav-link dash-li"
              >
                <i className="fas fa-bell pr-4 pl-4 dash-icon shake"></i>
                <span className="hide-span">Compiler</span>
                <span className="tooltip">Compiler</span>
              </NavLink>
            </li>
            <li className="nav-item dash-item mb-2 color-11">
              <NavLink
                to="/login"
                onClick={() => {
                  // props.setLogin(false);
                  authDispatch({ type: "REMOVE_USER", payload: null });
                  localStorage.clear();
                }}
                className="nav-link dash-li"
              >
                <i className="fas fa-sign-out-alt pr-4 pl-4 dash-icon shake"></i>
                <span className="hide-span">Logout</span>
                <span className="tooltip">Logout</span>
              </NavLink>
            </li>
          </ul>
          <div className="sidebar-footer d-flex align-items-center justify-content-center position-relative">
            <Avatar
              style={{ background: "#39B98F", color: "#fff" }}
              className="mr-2"
            >
              {authState.user?.name?.substring(0, 1)}
            </Avatar>
            <div className="d-flex flex-column footer-span">
              <span className="user-name">{authState.user?.name}</span>
              <span className="register-no">{authState.user?.regno}</span>
            </div>
          </div>
        </div>
        <div className="main-div w-100">
          <Switch>
            <Route path="/dashboard" exact>
              <Dashboard setSideToggle={setSideToggle} snackBar={props.snackBar} />
            </Route>
            <Route path="/articles" exact>
              <Articles setSideToggle={setSideToggle} />
            </Route>
            <Route path="/roadmap" exact>
              <Roadmap setSideToggle={setSideToggle} />
            </Route>
            <Route path="/compiler" exact>
              <Compiler setSideToggle={setSideToggle} snackBar={props.snackBar}  />
            </Route>
            <Route path="/profile" exact>
              <Profile setSideToggle={setSideToggle} snackBar={props.snackBar}  />
            </Route>
            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
            <Route path="/codekata" exact>
              <Codekata
                snackBar={props.snackBar} 
                setSideToggle={setSideToggle}
              />
            </Route>
            {authState?.contest ? (
              [
                <>
                  <Route path="/codekata/:id/quiz/:questionId" exact>
                    <Quiz setSideToggle={setSideToggle} />
                  </Route>
                  <Route path="/codekata/:id/problem/:questionId" exact>
                    <Programs setSideToggle={setSideToggle} />
                  </Route>
                  <Route path="/codekata/:id" exact>
                    <ContestDetails setSideToggle={setSideToggle} />
                  </Route>
                </>,
              ]
            ) : (
              <Redirect to="/codekata" />
            )}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Main;
