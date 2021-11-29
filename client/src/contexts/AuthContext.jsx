import React, { createContext, useReducer } from "react";

const initialState = {
    user:null
}
// const actions = {
//     setUser : (user) => {
//     }
// }
const AuthReducer = (state,action) => {
    switch(action.type){
        case 'SET_USER':
            return {...state,user:action.payload}
        case 'REMOVE_USER':
            return {...state,user:null}
            default:
                return state
            }   
        }
        
const AuthContext = createContext(initialState);
const AuthProvider = (props) => {
    //This can get from prop also
    const [authState, authDispatch] = useReducer(AuthReducer, initialState)
  return (
    <div>
      <AuthContext.Provider
        value={[authState, authDispatch]}
      >
        {props.children}
      </AuthContext.Provider>
    </div>
  );
};

export {AuthProvider,AuthContext};
