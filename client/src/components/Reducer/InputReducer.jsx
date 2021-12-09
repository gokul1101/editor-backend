import React from "react";
import "./InputReducer.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const InputReducer = (props) => {
  console.log(props);
  return (
    <TextField
      rows={props.rows}
      label={props.label}
      id={props.id ? props.id : "outlined-basic"}
      label={props.label}
      fullWidth={props.fullWidth}
      multiline={props.multiline}
      variant="outlined"
      className={`w-100 ${props.className}`}
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      type={props.type}
      onChange={(e) => props.onClickHandler(e.target.value)}
    />
  );
};

export default InputReducer;
