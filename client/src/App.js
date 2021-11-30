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
  useHistory,
} from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import DataProvider from "./Context";
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
const App = () => {
  const history = useHistory();
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
  let [login, setLogin] = useState(localStorage.getItem("reg") ? true : false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  // useEffect(() => {
  //   localStorage.getItem("reg");
  //   setLogin(true);
  // }, [login]);
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
            {!login ? (
              <Login snackBar={snackBar} setLogin={setLogin} />
            ) : (
              <Redirect exact to="/" />
            )}
          </Route>
          <Route path="/">
            {login ? (
              [
                localStorage.getItem("role") === "student" ? (
                  <Main setLogin={setLogin} snackBar={snackBar} />
                ) : (
                  <AdminMain setLogin={setLogin} snackBar={snackBar} />
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
