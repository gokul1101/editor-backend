import React from "react";
import "./InputReducer.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const InputReducer = (props) => {
  return (
    <TextField
      id="outlined-basic"
      label={props.name}
      variant="outlined"
      className={`w-100 ${props.className}`}
      placeholder={props.placeholder}
      name={props.name}
      type={props.type}
      onChange = {(e) => props.onClickHandler(e.target.value)}
    />
  );
};

export default InputReducer;
