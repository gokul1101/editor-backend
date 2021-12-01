import "./App.css";
import { useContext, useEffect, useState } from "react";
import Login from "./components/Login/Login";
import AdminMain from "./components/Admin/Main/Main";
import Main from "./components/Student/Main/Main";
import { Redirect, Route, Switch, withRouter ,useHistory} from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import {AuthProvider,AuthContext} from "./contexts/AuthContext";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
const App = () => {
  const history = useHistory()
  //** Context Consumer */
  const [authState,authDispatch] = useContext(AuthContext)
  console.log(authState,authDispatch)
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };
  const snackBar = (snackMessage, messType) => {
    setSeverity(messType);
    setMessage(snackMessage);
    setOpen(true);
  };
  useEffect(() => {
    console.log(AuthProvider)
    const user = JSON.parse(localStorage.getItem("user"))
    if(!authState.user && user){
    localStorage.getItem("reg") && authDispatch({type:"SET_USER",payload:user}) 
    }else {
      history.push('/login')
    }
  },[])
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  return (
    // <AuthProvider snackBar={snackBar}>
    <>
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
              <Login snackBar={snackBar}  />
            ) : (
              <Redirect exact to="/" />
            )}
          </Route>
          <Route path="/">
            {authState.user ? (
              [
                localStorage.getItem("role") === "student" ? (
                  <Main  snackBar={snackBar} />
                ) : (
                  <AdminMain  snackBar={snackBar} />
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
      </>
    // </AuthProvider>
  );
};

export default withRouter(App);
