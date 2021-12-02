import { TextField } from "@material-ui/core";
import React from "react";

const AddQuiz = () => {
  return (
    <div className="container">
      <p className="text-left dash-title-category pb-2 mt-5">Add Quiz</p>
      <span className="create-con-text mt-1">
        By adding the quiz name you can add Multiple Choice Questions (MCQ's)
      </span>
      <TextField
        id="outlined-multiline-static"
        label="Multiline"
        multiline
        rows={10}
        variant="outlined"
      />
    </div>
  );
};

export default AddQuiz;
