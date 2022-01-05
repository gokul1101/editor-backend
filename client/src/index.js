import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {
  AuthProvider,
  initialState,
  AuthReducer,
} from "./contexts/AuthContext";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider
      initialState={
        localStorage.getItem("user")
          ? {user:JSON.parse(localStorage.getItem("user"))}
          : initialState
      }
      AuthReducer={AuthReducer}
    >
      <App />
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
