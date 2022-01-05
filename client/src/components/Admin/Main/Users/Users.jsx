import React from "react";
import "./Users.css";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import AddUser from "./AddUser/AddUser";
import ListUser from "./ListUser/ListUser";



const Users = (props) => {
  console.log(props);
  return (
    <div className="container-fluid add-user-container mt-4">
      <ul class="list-group d-flex align-items-center justify-content-end flex-row p-2 mt-3 mb-3">
        <li class="list-group-item user-group-pill">
          <NavLink
            exact
            className="user-navlink pr-3 pl-3 m-2 btn nav-button"
            to="/users/add-user"
            activeClassName="active-user-pill"
          >
            <i className="fas fa-plus pr-1 pl-1"></i> Add user
          </NavLink>
        </li>
        <li className="list-group-item user-group-pill">
          <NavLink
            exact
            className="user-navlink pr-3 pl-3 m-2 btn nav-button"
            to="/users/list-user"
            activeClassName="active-user-pill"
          >
            <i className="fas fa-clipboard-list pr-2 pl-1"></i>List user
          </NavLink>
        </li>
      </ul>
      <div className="container-fluid">
        <Switch>
          <Route path="/users/add-user" exact>
            <AddUser snackBar={props.snackBar}/>
          </Route>
          <Route path="/users/list-user" exact>
            <ListUser />
          </Route>
          <Route
            exact
            path="/users"
            render={() => <Redirect to="/users/add-user" />}
          />
        </Switch>
      </div>
    </div>
  
  );
};

export default Users;


//to="/users/add-user"
//to="/users/list-user"