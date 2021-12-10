import React from "react";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import CreateChallenge from "./CreateChallenge/CreateChallenge";
import TestCase from "./TestCase/TestCase";
const ChallengeDashboard = () => {
  const selectedTags = (tags) => {
    console.log(tags);
  };
  return (
    <div>
      <div className="challenge-container">
        <ul className="list-group d-flex align-items-center justify-content-center flex-row p-2 mt-3 mb-3">
          <li className="list-group-item user-group-pill">
            <NavLink
              exact
              className="user-navlink pr-3 pl-3 m-2"
              to="/challenges/dashboard/create-challenge"
              activeClassName="active-user-pill"
            >
              <i className="fas fa-plus pr-1 pl-1"></i> Create Challenge
            </NavLink>
          </li>
          <li className="list-group-item user-group-pill">
            <NavLink
              exact
              className="user-navlink pr-3 pl-3 m-2"
              to="/challenges/dashboard/create-testcase"
              activeClassName="active-user-pill"
            >
              <i className="fas fa-clipboard-list pr-2 pl-1"></i>
              TestCase
            </NavLink>
          </li>
        </ul>
        <div className="container p-0">
          <Switch>
            <Route
              path="/challenges/dashboard/create-challenge"
              exact
            >
              <CreateChallenge
                selectedTags={selectedTags}
                tags={["Wipro", "Virtusa"]}
              />
            </Route>
            <Route
              path="/challenges/dashboard/create-testcase"
              exact
            >
              <TestCase />
            </Route>
            <Route
              exact
              path="/challenges/dashboard"
              render={() => (
                <Redirect to="/challenges/dashboard/create-challenge" />
              )}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDashboard;
