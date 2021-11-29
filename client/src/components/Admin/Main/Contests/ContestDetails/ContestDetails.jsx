import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import "./ContestDetails.css";
import ContestChallenges from "./ContestChallenges/ContestChallenges";
import ContestQuizzes from "./ContestQuizzes/ContestQuizzes";
import ContestEdit from "./ContestEdit/ContestEdit";
import ContestStatictics from "./ContestStatictics/ContestStatictics";
import CreateContest from "../CreateContest/CreateContest";
const ContestDetails = () => {
  return (
    <div style={{ marginTop: '40px' }}>
      <ul class="container list-group d-flex align-items-center justify-content-center flex-row p-2 mt-3 mb-3 border">
        <li class="list-group-item user-group-pill">
          <NavLink
            exact
            className="edit-contest-li pr-3 pl-3 m-2"
            to="/contests/details/edit"
            activeClassName="box arrow-bottom"
          >
            <i className="fas fa-plus pr-1 pl-1"></i> Details
          </NavLink>
        </li>
        <li class="list-group-item user-group-pill">
          <NavLink
            exact
            className="edit-contest-li pr-3 pl-3 m-2"
            to="/contests/details/quizzes"
            activeClassName="box arrow-bottom"
          >
            <i className="fas fa-clipboard-list pr-2 pl-1"></i> Quizzes List
          </NavLink>
        </li>
        <li class="list-group-item user-group-pill">
          <NavLink
            exact
            className="edit-contest-li pr-3 pl-3 m-2"
            to="/contests/details/challenges"
            activeClassName="box arrow-bottom"
          >
            <i className="fas fa-clipboard-list pr-2 pl-1"></i>Challenges List
          </NavLink>
        </li>
        <li class="list-group-item user-group-pill">
          <NavLink
            exact
            className="edit-contest-li pr-3 pl-3 m-2"
            to="/contests/details/statistics"
            activeClassName="box arrow-bottom"
          >
            <i className="fas fa-clipboard-list pr-2 pl-1"></i>Statictics
          </NavLink>
        </li>
      </ul>
      <div>
        <Switch>
          <Route path="/contests/details/edit" exact>
            <CreateContest />
          </Route>
          <Route path="/contests/details/quizzes" exact>
            <ContestQuizzes />
          </Route>
          <Route path="/contests/details/challenges" exact>
            <ContestChallenges />
          </Route>
          <Route path="/contests/details/statistics" exact>
            <ContestStatictics />
          </Route>
          <Route
            path="/contests/details"
            render={() => <Redirect to="/contests/details/edit" />}
          />
        </Switch>
      </div>
    </div>
  );
};

export default ContestDetails;
