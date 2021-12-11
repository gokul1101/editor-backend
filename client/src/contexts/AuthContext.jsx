import React, { createContext, useReducer } from "react";

const initialState = {
  user: null,
  contest: null,
  challenge: null,
  duration: null,
};
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: { ...state.user, ...action.payload } };
    case "REMOVE_USER":
      return { ...state, user: null };
    case "SET_CONTEST":
      return { ...state, contest: action.payload };
    case "SET_CHALLENGE":
      return { ...state, challenge: action.payload };
    case "REMOVE_CHALLENGE":
      console.log("working");
      return { ...state, challenge: null };
    case "REMOVE_CONTEST":
      return { ...state, contest: null };
    case "SET_DURATION":
      return { ...state, duration: action.payload };
    case "REMOVE_DURATION":
      return { ...state, duration: null };
    default:
      return state;
  }
};

const AuthContext = createContext(initialState);
const AuthProvider = (props) => {
  const [authState, authDispatch] = useReducer(
    props.AuthReducer,
    props.initialState
  );
  return (
    <AuthContext.Provider value={[authState, authDispatch]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext, initialState, AuthReducer };
