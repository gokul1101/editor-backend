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
import helperService from "./services/helperService";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
const App = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("user"));

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
  const getUser = async () => {
    try {
      const { status, data } = await helperService.getUser(
        {},
        { headers: { Authorization: token } }
      );
      if (status === 200) {
        console.log(data);
        setUser({ ...data });
      }
    } catch ({ status, message }) {
      if (status === 401) {
        localStorage.clear();
        history.push("/login");
      }
      console.log(message);
    }
  };
  return (
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
            {token ? (
              <Redirect exact to="/" />
            ) : (
              <Login snackBar={snackBar} setToken={setToken} />
            )}
          </Route>
          <Route path="/">
            {localStorage.getItem("role") === "student" ? (
              <Main snackBar={snackBar} getUser={getUser} />
            ) : localStorage.getItem("role") === "admin" ? (
              <AdminMain snackBar={snackBar} getUser={getUser} />
            ) : (
              (localStorage.clear(), (<Redirect to="/login" />))
            )}
          </Route>
        </Switch>
      </div>
      <div className="breakpoint d-flex" style={{ height: "100vh" }}>
        This page Enables on Tablet
      </div>
    </>
  );
};

export default withRouter(App);
