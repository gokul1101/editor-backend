import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import helperService from "../../../../../../services/helperService";
import CustomButton from "../../../../../Reducer/CustomButton/CustomButton";
import InputReducer from "../../../../../Reducer/InputReducer";
import SelectReducer from "../../../../../Reducer/SelectReducer/SelectReducer";
import "./AddQuiz.css";
import QuizQuestion from "./QuizQuestion/QuizQuestion";
const AddQuiz = () => {
  const [question, setQuestion] = useState({
    statement: "",
    options: {
      A: "",
      B: "",
      C: "",
      D: "",
      correctOption: "",
    },
    type_id: "mcq",
  });

  const [updateFlag, setUpdateFlag] = useState(false);

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
        { quiz_id: id, ...question },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 201) {
        setQuestions([...questions, mcq]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deleteQuestion = async (question) => {
    try {
      const { data, status } = await helperService.deleteQuestion(
        { ...question, type_id: "mcq" },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 202) {
        console.log(questions, question);
        setQuestions(
          questions.filter((ques) => ques.question_id !== question.question_id)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateQuestion = async () => {
    try {
      const { status } = await helperService.updateQuestion(
        { ...question, quiz_id: id },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 200) {
        console.log(
          questions.map((ques) => {
            if (ques.question_id === question.question_id) return question;
            return ques;
          })
        );
        setQuestions(
          questions.map((ques) => {
            if (ques.question_id === question.question_id) return question;
            return ques;
          })
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setUpdateFlag(false);
      setQuestion({
        statement: "",
        options: {
          A: "",
          B: "",
          C: "",
          D: "",
          correctOption: "",
        },
        type_id: "mcq",
      });
    }
  };
  const updateDetails = async (question) => {
    setUpdateFlag(true);
    setQuestion({ ...question, type_id: "mcq" });
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
        value={question.statement}
        onClickHandler={(value) =>
          setQuestion({ ...question, statement: value })
        }
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
            value={question.options.A}
            onClickHandler={(value) =>
              setQuestion({
                ...question,
                options: { ...question.options, A: value },
              })
            }
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
            value={question.options.B}
            onClickHandler={(value) =>
              setQuestion({
                ...question,
                options: { ...question.options, B: value },
              })
            }
          />
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
            value={question.options.C}
            onClickHandler={(value) =>
              setQuestion({
                ...question,
                options: { ...question.options, C: value },
              })
            }
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
            value={question.options.D}
            onClickHandler={(value) =>
              setQuestion({
                ...question,
                options: { ...question.options, D: value },
              })
            }
          />
        </div>
      </div>
      <div className="d-flex">
        <div className="col-md-4 mr-auto">
          <SelectReducer
            array={["A", "B", "C", "D"]}
            className="w-100 mt-3"
            name="Correct Option"
            value={question.options.correctOption}
            handleSelect={(e) =>
              setQuestion({
                ...question,
                options: { ...question.options, correctOption: e.target.value },
              })
            }
          />
        </div>
        <CustomButton
          className="btn-hover color-11 mt-4 float-right"
          onClickHandler={updateFlag ? updateQuestion : createQuestion}
        >
          {updateFlag ? (
            <span>
              UPADTE QUIZ<i className="fas fa-plus pr-2 pl-3"></i>
            </span>
          ) : (
            <span>
              ADD QUIZ<i className="fas fa-plus pr-2 pl-3"></i>
            </span>
          )}
        </CustomButton>
      </div>
      <div className="quiz-accordian mt-4 d-flex flex-column">
        {questions.map((question, index) => {
          return (
            <QuizQuestion
              question={question}
              index={index}
              updateDetails={updateDetails}
              deleteQuestion={deleteQuestion}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AddQuiz;

/* 
<div className="d-flex flex-wrap">
        {questions.map((question) => (
          <div className="respective-question-badge col-md-4 mt-2 mb-2 p-3">
            <div className="d-flex flex-column">
              <div className="edit-add-quiz p-2 d-flex align-items-end justify-content-end">
                <i
                  className="fas fa-edit mr-2 ml-2"
                  onClick={() => updateDetails(question)}
                ></i>
                <i
                  className="fas fa-trash mr-2 ml-2"
                  onClick={() => deleteQuestion(question)}
                ></i>
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

*/
