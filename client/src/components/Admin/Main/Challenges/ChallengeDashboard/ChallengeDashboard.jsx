import React, { useEffect, useContext } from "react";
import { NavLink, Route, Switch, Redirect, useParams } from "react-router-dom";
import { AuthContext } from "../../../../../contexts/AuthContext";
import helperService from "../../../../../services/helperService";
<<<<<<< HEAD
=======
import PageNotFound from "../../../../Reducer/PageNotFound/404";
>>>>>>> 8c8eb1f7bbe9348f454449d77f15a5eddf533f2c
import CreateChallenge from "./CreateChallenge/CreateChallenge";
import TestCase from "./TestCase/TestCase";
const ChallengeDashboard = (props) => {
  const [authState, authDispatch] = useContext(AuthContext);
  const { id } = useParams();
  const fetchChallenge = async () => {
    try {
      const {
        data: { question },
        status,
      } = await helperService.getQuestion(
        { id, type: "problem" },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 200) {
        authDispatch({ type: "SET_CHALLENGE", payload: { ...question } });
      }
    } catch (err) {}
  };
  useEffect(() => {
    if (!authState?.challenge) fetchChallenge();
  }, []);

  return (
    <>
      <div
        className="challenge-container"
        style={{ height: "100vh", overflowY: "auto" }}
      >
        <ul className="list-group d-flex align-items-center justify-content-center flex-row p-2 mt-3 mb-3">
          <li className="list-group-item user-group-pill">
            <NavLink
              exact
              className="user-navlink pr-3 pl-3 m-2 btn nav-button d-flex justify-content-center align-items-center"
              to={`/challenges/${id}/update`}
              activeClassName="active-user-pill"
            >
              <i className="fas fa-plus pr-1 pl-1 "></i> Challenge
            </NavLink>
          </li>
          <li className="list-group-item user-group-pill">
            <NavLink
              exact
              className="user-navlink pr-3 pl-3 m-2 btn nav-button d-flex justify-content-center align-items-center"
              to={`/challenges/${id}/create-testcase`}
              activeClassName="active-user-pill"
            >
              <i className="fas fa-clipboard-list pr-2 pl-1"></i>
              TestCase
            </NavLink>
          </li>
        </ul>
        <div>
          <Switch>
            <Route path={`/challenges/:id/update`} exact>
              <CreateChallenge
                title="Update Challenge"
                fetchChallenge={fetchChallenge}
                snackBar={props.snackBar}
              />
            </Route>
            <Route path={`/challenges/:id/create-testcase`} exact>
              <TestCase snackBar={props.snackBar} />
            </Route>
<<<<<<< HEAD
=======
            <Route path="*">
              <PageNotFound />
            </Route>
>>>>>>> 8c8eb1f7bbe9348f454449d77f15a5eddf533f2c
            <Route
              exact
              path="/challenges/:id"
              render={() => <Redirect to={`/challenges/${id}/update`} />}
            />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default ChallengeDashboard;
