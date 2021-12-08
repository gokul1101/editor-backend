import React, { createContext, useReducer } from "react";

const initialState = {
  user: null,
  contest: null,
};
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: { ...state.user, ...action.payload } };
    case "REMOVE_USER":
      return { ...state, user: null };
    case "SET_CONTEST":
      return { ...state, contest: action.payload };
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
