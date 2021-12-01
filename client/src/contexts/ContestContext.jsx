import React, { createContext, useReducer } from "react";

 const initialState = {
    contest:null
}
// const actions = {
//     setUser : (user) => {
//     }
// }
 const ContestReducer = (state,action) => {
    switch(action.type){
        case 'SET_CONTEST':
            return {...state,contest:{...state.contest,...action.payload}}
        case 'REMOVE_CONTEST':
            return {...state,user:null}
            default:
                return state
            }   
        }
        
const ContestContext = createContext(initialState);
const ContestProvider = (props) => {
    //This can get from prop also
    const [contestState, contestDispatch] = useReducer(ContestReducer,initialState)
  return (
    
      <ContestContext.Provider
        value={[contestState, contestDispatch]}
      >
        {props.children}
      </ContestContext.Provider>
  
  );
};

export {ContestProvider,ContestContext,initialState,ContestReducer};
