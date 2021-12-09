import { TextField } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import helperService from "../../../../../../services/helperService";
import InputReducer from "../../../../../Reducer/InputReducer";
import SelectReducer from "../../../../../Reducer/SelectReducer/SelectReducer";
import "./AddQuiz.css";
const AddQuiz = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState({
    A: "",
    B: "",
    C: "",
    D: "",
    correctOption: "",
  });
  const [authState] = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();
  const fetchQuizzes = async () => {
    try {
      const {
        status,
        data: { mcqs },
      } = await helperService.getQuizQuestions(
        { id },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 200) {
        console.log(mcqs);
        setQuestions(mcqs);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const createQuestion = async () => {
    try {
      const {
        data: { mcq },
        status,
      } = await helperService.createQuizQuestion(
        { quiz_id: id, statement: question, options, type_id: "mcq" },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 201) {
        setQuestions([...questions, mcq]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deleteQuestion = async () => {
    try {
      const { data, status } = await helperService.deleteQuestion();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);
  return (
    <div className="container" style={{ height: "100vh", overflowY: "scroll" }}>
      <p className="text-left dash-title-category pb-2 mt-5">Add Quiz</p>
      <span className="create-con-text mt-1">
        By adding the quiz name you can add Multiple Choice Questions (MCQ's)
      </span>
      <InputReducer
        id="outlined-multiline-static"
        label="Enter Question"
        className="mt-3"
        fullWidth
        multiline
        rows={10}
        variant="outlined"
        value={question}
        onClickHandler={(value) => setQuestion(value)}
      />
      <div className="d-flex">
        <div className="col-md-6">
          <InputReducer
            id="outlined-multiline-static"
            label="A"
            className="mt-3"
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            value={options.A}
            onClickHandler={(value) => setOptions({ ...options, A: value })}
          />
        </div>
        <div className="col-md-6">
          <InputReducer
            id="outlined-multiline-static"
            label="B"
            className="mt-3"
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            value={options.B}
            onClickHandler={(value) => setOptions({ ...options, B: value })}
          />
          {/* <TextField
           
          /> */}
        </div>
      </div>
      <div className="d-flex">
        <div className="col-md-6">
          <InputReducer
            id="outlined-multiline-static"
            label="C"
            className="mt-3"
            fullWidth
            multiline
            rows={2}
            value={options.C}
            onClickHandler={(value) => setOptions({ ...options, C: value })}
          />
        </div>
        <div className="col-md-6">
          <InputReducer
            id="outlined-multiline-static"
            label="D"
            className="mt-3"
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            value={options.D}
            onClickHandler={(value) => setOptions({ ...options, D: value })}
          />
        </div>
        {/* <div className="col-md-6"> */}

        {/* </div> */}
      </div>
      <div className="d-flex">
        <div className="col-md-4 mr-auto">
          <SelectReducer
            array={["A", "B", "C", "D"]}
            className="w-100 mt-3"
            name="Correct Option"
            value={options.correctOption}
            handleSelect={(e) =>
              setOptions({ ...options, correctOption: e.target.value })
            }
          />
        </div>
        <div className="create-con mt-4 clearfix">
          <button className="p-2 float-right" onClick={createQuestion}>
            ADD QUIZ<i class="fas fa-plus pr-2 pl-3"></i>
          </button>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {questions.map((question) => (
          <div className="respective-question-badge col-md-4 mt-2 mb-2 p-3">
            <div className="d-flex flex-column">
              <div className="edit-add-quiz p-2 d-flex align-items-end justify-content-end">
                <i class="fas fa-edit mr-2 ml-2"></i>
                <i class="fas fa-trash mr-2 ml-2"></i>
              </div>
              <div className="d-flex">
                <span className="add-quiz-question-span mt-2 mb-2">
                  {question.statement}
                </span>
              </div>
              <div className="d-flex align-items-center">
                <div className="option-add-quiz mr-2">A.</div>
                <div className="answer-add-quiz m-1 p-1">
                  <span>{question.options.A}</span>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="option-add-quiz mr-2">B.</div>
                <div className="answer-add-quiz m-1 p-1">
                  <span>{question.options.B}</span>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="option-add-quiz mr-2">C.</div>
                <div className="answer-add-quiz m-1 p-1">
                  <span>{question.options.C}</span>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="option-add-quiz mr-2">D.</div>
                <div className="answer-add-quiz m-1 p-1">
                  <span>{question.options.D}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddQuiz;
