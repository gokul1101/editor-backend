import { NavLink, Switch, Route, useParams, Redirect } from "react-router-dom";
import "./ContestDetails.css";
import ContestChallenges from "./ContestChallenges/ContestChallenges";
import ContestQuizzes from "./ContestQuizzes/ContestQuizzes";
import ContestStatictics from "./ContestStatictics/ContestStatictics";
import CreateContest from "../CreateContest/CreateContest";

import CreateChallenge from "../../Challenges/ChallengeDashboard/CreateChallenge/CreateChallenge";
import { useContext, useEffect } from "react";
import { AuthContext, useLoader } from "../../../../../contexts/AuthContext";
import helperService from "../../../../../services/helperService";
<<<<<<< HEAD
=======
import PageNotFound from "../../../../Reducer/PageNotFound/404";
>>>>>>> 8c8eb1f7bbe9348f454449d77f15a5eddf533f2c
const convertDate = (date) => {
  if (date) return date.split("T")[0];
  return "";
};
const ContestDetails = (props) => {
  const [loader, showLoader, hideLoader] = useLoader();
  const [authState, authDispatch] = useContext(AuthContext);
  const { id } = useParams();
  const fetchContest = async () => {
    try {
      showLoader();
      const { data, status } = await helperService.getContest(
        { id },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 200) {
        // setName(data?.contest?.name);
        // setDate({
        //   start_date: convertDate(data?.contest?.start_date),
        //   end_date: convertDate(data?.contest?.end_date),
        // });
        // setTime({
        //   start_time: data?.contest?.start_time,
        //   end_time: data?.contest?.end_time,
        // });
        authDispatch({ type: "SET_CONTEST", payload: data?.contest });
        hideLoader();
        // authDispatch({})
      }
    } catch (err) {
      hideLoader();
    }
  };
  useEffect(() => {
    if (!authState?.contest) fetchContest();
    return () => {
      authDispatch({ type: "REMOVE_CONTEST" });
    };
  }, []);
  return (
<<<<<<< HEAD
    <div style={{height:'100vh',overflowY:'scroll'}}>
      <ul className="container-fluid list-group d-flex flex-row py-2 my-3">
        {authState?.contest &&
        !(new Date(authState?.contest?.end_date) < new Date()) ? (
          <>
            <li className="list-group-item user-group-pill">
              <NavLink
                exact
                className="edit-contest-li px-3 mt-2 mb-2"
                to={`/contests/${id}/edit`}
                activeClassName="box arrow-bottom"
              >
                <i className="fas fa-plus pr-1 pl-1"></i> Details
              </NavLink>
            </li>
            <li className="list-group-item user-group-pill">
              <NavLink
                exact
                className="edit-contest-li px-3 m-2"
                to={`/contests/${id}/quizzes`}
                activeClassName="box arrow-bottom"
              >
                <i className="fas fa-clipboard-list pr-2 pl-1"></i> Quizzes List
              </NavLink>
            </li>
            <li className="list-group-item user-group-pill">
              <NavLink
                exact
                className="edit-contest-li px-3 m-2"
                to={`/contests/${id}/challenges`}
                activeClassName="box arrow-bottom"
              >
                <i className="fas fa-clipboard-list pr-2 pl-1"></i>Challenges
                List
              </NavLink>
            </li>
          </>
        ) : null}

        <li className="list-group-item user-group-pill">
          <NavLink
            exact
            className="edit-contest-li px-3 m-2"
            to={`/contests/${id}/statistics`}
            activeClassName="box arrow-bottom"
          >
            <i className="fas fa-clipboard-list pr-2 pl-1"></i>Statictics
          </NavLink>
        </li>
=======
    <div style={{ height: "100vh", overflowY: "scroll" }}>
      <ul className="container-fluid list-group d-flex flex-row py-2 px-3 my-3">
        {authState?.contest &&
        !(new Date(authState?.contest?.end_date) < new Date()) ? (
          <>
            <NavLink
              exact
              className="edit-contest-li px-3 mt-2 mb-2"
              to={`/contests/${id}/edit`}
              activeClassName="box arrow-bottom"
            >
              <li className="list-group-item user-group-pill position-relative">
                <i className="fas fa-plus pr-1 pl-1"></i> Details
              </li>
            </NavLink>
            <NavLink
              exact
              className="edit-contest-li px-3 mt-2 mb-2"
              to={`/contests/${id}/quizzes`}
              activeClassName="box arrow-bottom"
            >
              <li className="list-group-item user-group-pill position-relative">
                <i className="fas fa-clipboard-list pr-2 pl-1"></i> Quizzes List
              </li>
            </NavLink>
            <NavLink
              exact
              className="edit-contest-li px-3 mt-2 mb-2"
              to={`/contests/${id}/challenges`}
              activeClassName="box arrow-bottom"
            >
              <li className="list-group-item user-group-pill position-relative">
                <i className="fas fa-clipboard-list pr-2 pl-1"></i>Challenges
                List
              </li>
            </NavLink>
          </>
        ) : null}

        <NavLink
          exact
          className="edit-contest-li px-3 mt-2 mb-2"
          to={`/contests/${id}/statistics`}
          activeClassName="box arrow-bottom"
        >
          <li className="list-group-item user-group-pill position-relative">
            <i className="fas fa-clipboard-list pr-2 pl-1"></i>Statictics
          </li>
        </NavLink>
>>>>>>> 8c8eb1f7bbe9348f454449d77f15a5eddf533f2c
      </ul>
      <div>
        <Switch>
          {authState?.contest &&
          !(new Date(authState?.contest?.end_date) < new Date()) ? (
            <>
              <Route path={`/contests/:id/edit`} exact>
                <CreateContest title="Update Contest" snackBar={props.snackBar}/>
              </Route>
              <Route path={`/contests/:id/quizzes`} exact>
                <ContestQuizzes snackBar={props.snackBar} />
              </Route>
              <Route path={`/contests/:id/challenges`}>
                <Route path="/contests/:id/challenges" exact>
                  <ContestChallenges snackBar={props.snackBar} />
                </Route>
                <Route path="/contests/:id/challenges/create" exact>
                  <CreateChallenge snackBar={props.snackBar} />
                </Route>
              </Route>
              <Route path={`/contests/:id/statistics`} exact>
                <ContestStatictics snackBar={props.snackBar} />
              </Route>
            </>
<<<<<<< HEAD
          ) : null}
          <Route path={`/contests/:id/statistics`} exact>
            <ContestStatictics snackBar={props.snackBar} />
          </Route>
          
          <Route
            path={`/contests/:id`}
            render={() => <Redirect to={`/contests/${id}/edit`} />}
          />
=======
          ) : (
            <></>
          )}
          <Route path={`/contests/:id/statistics`} exact>
            <ContestStatictics snackBar={props.snackBar} />
          </Route>

          {/* <Route
            path={`/contests/:id`}
            render={() => <Redirect to={`/contests/${id}/edit`} />}
          /> */}
          <Route path="*">
            <PageNotFound />
          </Route>
>>>>>>> 8c8eb1f7bbe9348f454449d77f15a5eddf533f2c
        </Switch>
      </div>
    </div>
  );
};

export default ContestDetails;
