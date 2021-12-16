import "./App.css";
import { useContext, useState } from "react";
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
  //** Context Consumer */
  const [authState, authDispatch] = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };
  const snackBar = (snackMessage, messType) => {
    setSeverity(messType);
    setMessage(snackMessage);
    setOpen(true);
  };
  const fetchUser = async () => {
    try {
      const { status, data } = await helperService.getUser(
        {},
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 200) {
        authDispatch({
          type: "SET_USER",
          payload: { ...data["userDetails"] },
        });
      }
    } catch (err) {
      console.log(err);
      // if (err.status === 401) unauthorized(err.data);
      // snackBar(err.data, "error");
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
            {!authState.user ? (
              <Login snackBar={snackBar} />
            ) : (
              <Redirect exact to="/" />
            )}
          </Route>
          <Route path="/">
            {authState.user ? (
              [
                authState.user.role === "student" ? (
                  <Main snackBar={snackBar} fetchUser={fetchUser} />
                ) : (
                  <AdminMain snackBar={snackBar} fetchUser={fetchUser} />
                ),
              ]
            ) : (
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
