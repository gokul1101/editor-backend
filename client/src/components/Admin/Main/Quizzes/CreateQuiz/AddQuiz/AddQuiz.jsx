import { TextField } from "@material-ui/core";
import React from "react";
import "./AddQuiz.css";
const AddQuiz = () => {
  return (
    <div className="container" style={{ height: "100vh", overflowY: "scroll" }}>
      <p className="text-left dash-title-category pb-2 mt-5">Add Quiz</p>
      <span className="create-con-text mt-1">
        By adding the quiz name you can add Multiple Choice Questions (MCQ's)
      </span>
      <TextField
        fullWidth
        className="mt-3"
        id="outlined-multiline-static"
        label="Enter Question"
        multiline
        rows={10}
        variant="outlined"
      />
      <div className="d-flex">
        <div className="col-md-6">
          <TextField
            fullWidth
            className="mt-3"
            id="outlined-multiline-static"
            label="Enter Option 1"
            multiline
            rows={2}
            variant="outlined"
          />
        </div>
        <div className="col-md-6">
          <TextField
            fullWidth
            className="mt-3"
            id="outlined-multiline-static"
            label="Enter Option 2"
            multiline
            rows={2}
            variant="outlined"
          />
        </div>
      </div>
      <div className="d-flex">
        <div className="col-md-6">
          <TextField
            fullWidth
            className="mt-3"
            id="outlined-multiline-static"
            label="Enter Option 3"
            multiline
            rows={2}
            variant="outlined"
          />
        </div>
        <div className="col-md-6">
          <TextField
            fullWidth
            className="mt-3"
            id="outlined-multiline-static"
            label="Enter Option 4"
            multiline
            rows={2}
            variant="outlined"
          />
        </div>
      </div>
      <div className="create-con mt-3 clearfix">
        <button className="p-2 float-right">
          ADD QUIZ<i class="fas fa-plus pr-2 pl-3"></i>
        </button>
      </div>
      <div className="d-flex flex-wrap">
        <div className="respective-question-badge col-md-4 mt-2 mb-2 p-3">
          <div className="d-flex flex-column">
            <div className="edit-add-quiz p-2 d-flex align-items-end justify-content-end">
              <i class="fas fa-edit mr-2 ml-2"></i>
              <i class="fas fa-trash mr-2 ml-2"></i>
            </div>
            <div className="d-flex">
              <span className="add-quiz-question-span mt-2 mb-2">
                Who is the Villan in Maanadu?
              </span>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">A.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex align-items-end justify-content-end</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">B.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex align-items-end justify</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">C.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex align-items-end</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">D.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex</span>
              </div>
            </div>
          </div>
        </div>
        <div className="respective-question-badge col-md-4 mt-2 mb-2 p-3">
          <div className="d-flex flex-column">
            <div className="edit-add-quiz p-2 d-flex align-items-end justify-content-end">
              <i class="fas fa-edit mr-2 ml-2"></i>
              <i class="fas fa-trash mr-2 ml-2"></i>
            </div>
            <div className="d-flex">
              <span className="add-quiz-question-span mt-2 mb-2">
                Who is the Villan in Maanadu?
              </span>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">A.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex align-items-end justify-content-end</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">B.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex align-items-end justify</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">C.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex align-items-end</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">D.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex</span>
              </div>
            </div>
          </div>
        </div>
        <div className="respective-question-badge col-md-4 mt-2 mb-2 p-3">
          <div className="d-flex flex-column">
            <div className="edit-add-quiz p-2 d-flex align-items-end justify-content-end">
              <i class="fas fa-edit mr-2 ml-2"></i>
              <i class="fas fa-trash mr-2 ml-2"></i>
            </div>
            <div className="d-flex">
              <span className="add-quiz-question-span mt-2 mb-2">
                Who is the Villan in Maanadu?
              </span>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">A.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex align-items-end justify-content-end</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">B.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex align-items-end justify</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">C.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex align-items-end</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">D.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex</span>
              </div>
            </div>
          </div>
        </div>
        <div className="respective-question-badge col-md-4 mt-2 mb-2 p-3">
          <div className="d-flex flex-column">
            <div className="edit-add-quiz p-2 d-flex align-items-end justify-content-end">
              <i class="fas fa-edit mr-2 ml-2"></i>
              <i class="fas fa-trash mr-2 ml-2"></i>
            </div>
            <div className="d-flex">
              <span className="add-quiz-question-span mt-2 mb-2">
                Who is the Villan in Maanadu?
              </span>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">A.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex align-items-end justify-content-end</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">B.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex align-items-end justify</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">C.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex align-items-end</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">D.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex</span>
              </div>
            </div>
          </div>
        </div>
        <div className="respective-question-badge col-md-4 mt-2 mb-2 p-3">
          <div className="d-flex flex-column">
            <div className="edit-add-quiz p-2 d-flex align-items-end justify-content-end">
              <i class="fas fa-edit mr-2 ml-2"></i>
              <i class="fas fa-trash mr-2 ml-2"></i>
            </div>
            <div className="d-flex">
              <span className="add-quiz-question-span mt-2 mb-2">
                Who is the Villan in Maanadu?
              </span>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">A.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex align-items-end justify-content-end</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">B.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex align-items-end justify</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">C.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex align-items-end</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">D.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex</span>
              </div>
            </div>
          </div>
        </div>
        <div className="respective-question-badge col-md-4 mt-2 mb-2 p-3">
          <div className="d-flex flex-column">
            <div className="edit-add-quiz p-2 d-flex align-items-end justify-content-end">
              <i class="fas fa-edit mr-2 ml-2"></i>
              <i class="fas fa-trash mr-2 ml-2"></i>
            </div>
            <div className="d-flex">
              <span className="add-quiz-question-span mt-2 mb-2">
                Who is the Villan in Maanadu?
              </span>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">A.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex align-items-end justify-content-end</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">B.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex align-items-end justify</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">C.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex align-items-end</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="option-add-quiz mr-2">D.</div>
              <div className="answer-add-quiz m-1 p-1">
                <span>d-flex</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuiz;
