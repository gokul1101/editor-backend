import "./App.css";
import { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import AdminMain from "./components/Admin/Main/Main";
import Main from "./components/Student/Main/Main";
import {
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { AuthContext } from "./contexts/AuthContext";
import helperService from "./services/helperService";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
const App = () => {
  //** Context Consumer */
  const [authState, authDispatch] = useContext(AuthContext);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };
  const snackBar = (snackMessage, messType) => {
    setSeverity(messType);
    console.log(history);
    setMessage(snackMessage);
    setOpen(true);
  };
  // const getUser = () => {};
  // const checkUser = () => {
  //   // if(localStorage.getItem(token)) getUser()
  // };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const fetchUser = async () => {
    try{
    const response = await helperService.getUser({},{headers:{'Authorization':authState.user.token}})
      if(response.status === 200){
        authDispatch({type:"SET_USER_DETAILS",payload:response.data})
      }
    }catch(err){
       if(err.status === 401){
          localStorage.clear()
       }
    };
  }
    useEffect(async () => {
      if(localStorage.getItem('user') && !authState.user.regno ) await fetchUser();
      console.log("At app.js useEffect => ",authState)
  }, []);
  return (
    <DataProvider snackBar={snackBar}>
      <div className="App m-0 p-0">
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
        <Switch>
          <Route path="/login">
            {!authState.user ? (
              <Login snackBar={snackBar} />
            ) : (
              <Redirect exact to="/" />
            )}
          </Route>
          <Route path="/">
            {login ? (
              [
                
                authState.user.role && authState.user.role == "student"  ? (
                  <Main snackBar={snackBar} />
                ) : (
                  <AdminMain snackBar={snackBar} />
                ),
              ]
            ) : (
              // <AdminMain setLogin={setLogin} snackBar={snackBar} />
              <Redirect exact to="/login" />
            )}
          </Route>
        </Switch>
      </div>
      <div className="breakpoint d-flex" style={{ height: "100vh" }}>
        This page Enables on Tablet
      </div>
    </DataProvider>
  );
};

export default withRouter(App);
