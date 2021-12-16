import React, { useState } from "react";

const QuizQuestion = ({ question, index, updateDetails, deleteQuestion }) => {
  console.log(updateDetails);
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <div className="d-flex" key={index}>
        <div
          className="p-2 px-4 quiz-ques mr-auto d-flex m-1 flex-column"
          style={{ width: "90%", wordWrap: "break-word" }}
          onClick={(e) => setIsActive(!isActive)}
        >
          <span>{question.statement}</span>
          <span>Correct Option : {question.options.correctOption}</span>
        </div>
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
      </div>
      {isActive ? (
        <div className="quiz-options d-flex flex-wrap">
          <div className="d-flex col-md-6">
            <div className="option-add-quiz position-absolute mr-2">A.</div>
            <div className="answer-add-quiz text-left m-1 p-2 d-flex align-items-center justify-content-center">
              <span className="px-2 text-justify">{question.options.A}</span>
            </div>
          </div>
          <div className="d-flex col-md-6">
            <div className="option-add-quiz position-absolute mr-2">B.</div>
            <div className="answer-add-quiz text-left m-1 p-2 d-flex align-items-center justify-content-center">
              <span className="px-2 text-justify">{question.options.B}</span>
            </div>
          </div>
          <div className="d-flex col-md-6">
            <div className="option-add-quiz position-absolute mr-2">C.</div>
            <div className="answer-add-quiz text-left m-1 p-2 d-flex align-items-center justify-content-center">
              <span className="px-2 text-justify">{question.options.C}</span>
            </div>
          </div>
          <div className="d-flex col-md-6">
            <div className="option-add-quiz position-absolute mr-2">D.</div>
            <div className="answer-add-quiz text-left m-1 p-2 d-flex align-items-center justify-content-center">
              <span className="px-2 text-justify">{question.options.D}</span>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default QuizQuestion;
