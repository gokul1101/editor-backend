import { NavLink, Switch, Route, Redirect, useParams } from "react-router-dom";
import "./ContestDetails.css";
import ContestChallenges from "./ContestChallenges/ContestChallenges";
import ContestQuizzes from "./ContestQuizzes/ContestQuizzes";
import ContestStatictics from "./ContestStatictics/ContestStatictics";
import CreateContest from "../CreateContest/CreateContest";
import ChallengeDashboard from "../../Challenges/ChallengeDashboard/ChallengeDashboard";
import Challenges from "../../Challenges/Challenges";
const ContestDetails = () => {
  const { id } = useParams();
  return (
    <div style={{ marginTop: "40px" }} className="p-4">
      <ul class="container-fluid list-group d-flex flex-row pt-2 pb-2 mt-3 mb-3 border">
        <li class="list-group-item user-group-pill">
          <NavLink
            exact
            className="edit-contest-li pr-3 pl-3 mt-2 mb-2"
            to={`/contests/${id}/edit`}
            activeClassName="box arrow-bottom"
          >
            <i className="fas fa-plus pr-1 pl-1"></i> Details
          </NavLink>
        </li>
        <li class="list-group-item user-group-pill">
          <NavLink
            exact
            className="edit-contest-li pr-3 pl-3 m-2"
            to={`/contests/${id}/quizzes`}
            activeClassName="box arrow-bottom"
          >
            <i className="fas fa-clipboard-list pr-2 pl-1"></i> Quizzes List
          </NavLink>
        </li>
        <li class="list-group-item user-group-pill">
          <NavLink
            exact
            className="edit-contest-li pr-3 pl-3 m-2"
            to={`/contests/${id}/challenges`}
            activeClassName="box arrow-bottom"
          >
            <i className="fas fa-clipboard-list pr-2 pl-1"></i>Challenges List
          </NavLink>
        </li>
        <li class="list-group-item user-group-pill">
          <NavLink
            exact
            className="edit-contest-li pr-3 pl-3 m-2"
            to={`/contests/${id}/statistics`}
            activeClassName="box arrow-bottom"
          >
            <i className="fas fa-clipboard-list pr-2 pl-1"></i>Statictics
          </NavLink>
        </li>
      </ul>
      <div>
        <Switch>
          <Route path={`/contests/:id/edit`} exact>
            <CreateContest title="Update Contest" />
          </Route>
          <Route path={`/contests/:id/quizzes`} exact>
            <ContestQuizzes />
          </Route>
          <Route path={`/contests/:id/challenges`} >
            <Route path = "/contests/:id/challenges" exact>
            <ContestChallenges />
            </Route>
            <Route path="/contests/:id/challenges/create" exact>
            <ChallengeDashboard />
          </Route>
          </Route>
          <Route path={`/contests/:id/statistics`} exact>
            <ContestStatictics />
          </Route>


          {/* <Route
            path={`/contests/:id`}
            render={() => <Redirect to={`/contests/${id}/edit`} />}
          /> */}
        </Switch>
      </div>
    </div>
  );
};

export default ContestDetails;
