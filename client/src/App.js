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
import { AuthContext } from "./contexts/AuthContext";
import axios from "axios";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
const App = () => {
  const history = useHistory();
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
  const getUser = () => {};
  const checkUser = () => {
    // if(localStorage.getItem(token)) getUser()
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const fetchUser = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/v1/user/get/1813076",
      { headers: { Authorization: authState.user.token } }
    );
    authDispatch({type:"SET_USER",payload:{...response["data"]["userDetails"]}})
  };
  useEffect(() => {
    if(localStorage.getItem('user')) fetchUser();
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
                authState.user.role === "student" ? (
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
