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
          
            return {...state,user:{...state.user,...action.payload}}
        case 'SET_USER_DETAILS':
          const user = {...state['user'],...action.payload}
            return {...state,user}
        case 'REMOVE_USER':
            return {...state,user:null}
            default:
                return state
            }   
        }
        
const AuthContext = createContext(initialState);
const AuthProvider = (props) => {
    //This can get from prop also
    const [authState, authDispatch] = useReducer(props.AuthReducer, props.initialState)
  return (
    
      <AuthContext.Provider
        value={[authState, authDispatch]}
      >
        {props.children}
      </AuthContext.Provider>
  
  );
};

export {AuthProvider,AuthContext,initialState,AuthReducer};
