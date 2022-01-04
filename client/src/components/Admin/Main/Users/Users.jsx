import React from "react";
import "./Users.css";
import { NavLink, Switch, Route, Redirect, useHistory } from "react-router-dom";
import AddUser from "./AddUser/AddUser";
import ListUser from "./ListUser/ListUser";
import GoBack from "../../../Reducer/GoBack/GoBack";
<<<<<<< HEAD
=======
import PageNotFound from "../../../Reducer/PageNotFound/404";
>>>>>>> 8c8eb1f7bbe9348f454449d77f15a5eddf533f2c
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ListAltIcon from '@material-ui/icons/ListAlt';
const Users = (props) => {
  const history = useHistory();
  return (
    <div className="container-fluid add-user-container mt-4">
      <ul className="list-group d-flex  p-2 mt-3 mb-3">
        <div className="d-flex">
          <div className=" mr-auto">
            <GoBack onClickHandler={() => history.goBack()} />
          </div>
          <div className="add-user-nav d-flex">
            <li className="list-group-item user-group-pill">
              <NavLink
                exact
                className="user-navlink pr-3 pl-3 m-2 btn nav-button d-flex justify-content-center align-items-center"
                to="/users/add-user"
                activeClassName="active-user-pill"
              >
                <AddCircleIcon/>
                <span className="pl-1">Add user</span>
                 
              </NavLink>
            </li>
            <li className="list-group-item user-group-pill">
              <NavLink
                exact
                className="user-navlink pr-3 pl-3 m-2 btn nav-button d-flex justify-content-center align-items-center"
                to="/users/list-user"
                activeClassName="active-user-pill"
              >
                <ListAltIcon/>
                <span className="pl-1">List user</span>
              </NavLink>
            </li>
          </div>
        </div>
      </ul>
      <div className="container-fluid">
        <Switch>
          <Route path="/users/add-user" exact>
            <AddUser snackBar={props.snackBar} />
          </Route>
          <Route path="/users/list-user" exact>
            <ListUser snackBar={props.snackBar} />
          </Route>
          <Route
            exact
            path="/users"
            render={() => <Redirect to="/users/add-user" />}
          />
<<<<<<< HEAD
=======
          <Route path="*">
            <PageNotFound />
          </Route>
>>>>>>> 8c8eb1f7bbe9348f454449d77f15a5eddf533f2c
        </Switch>
      </div>
    </div>
  );
};

export default Users;

//to="/users/add-user"
//to="/users/list-user"
