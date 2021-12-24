import React, { useEffect, useContext } from "react";
import { NavLink, Route, Switch, Redirect, useParams } from "react-router-dom";
import { AuthContext } from "../../../../../contexts/AuthContext";
import helperService from "../../../../../services/helperService";
import CreateChallenge from "./CreateChallenge/CreateChallenge";
import TestCase from "./TestCase/TestCase";
const ChallengeDashboard = (props) => {
  console.log("At line challenge dashboard", props);
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
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(async () => {
    console.log('inside dashboard')
    if (!authState?.challenge) await fetchChallenge();
  }, []);

  return (
    <>
      <div className="challenge-container" style={{overflowY:'scroll',height:'100vh'}}>
        <ul className="list-group d-flex align-items-center justify-content-center flex-row p-2 mt-3 mb-3">
          <li className="list-group-item user-group-pill">
            <NavLink
              exact
              className="user-navlink pr-3 pl-3 m-2 border border-success "
              to={`/challenges/${id}/update`}
              activeClassName="active-user-pill"
              
            >
              <i className="fas fa-plus pr-1 pl-1 "></i> Challenge
            </NavLink>
          </li>
          <li className="list-group-item user-group-pill">
            <NavLink
              exact
              className="user-navlink pr-3 pl-3 m-2"
              to={`/challenges/${id}/create-testcase`}
              activeClassName="active-user-pill"
            >
              <i className="fas fa-clipboard-list pr-2 pl-1"></i>
              TestCase
            </NavLink>
          </li>
        </ul>
        <div className=" p-0">
          <Switch>
            <Route path={`/challenges/:id/update`} exact>
              <CreateChallenge
                title="Update Challenge"
                fetchChallenge={fetchChallenge}
                snackBar={props.snackBar}
              />
            </Route>
            <Route path={`/challenges/:id/create-testcase`} exact>
              <TestCase snackBar={props.snackBar}/>
            </Route>
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
