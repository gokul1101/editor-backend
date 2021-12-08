import React from "react";

const ContestCard = ({ image, question, routeQuestion }) => {
  return (
    <div
      className="dcard mr-5 mb-5 d-flex align-items-center justify-content-center ml-5"
      onClick={() => routeQuestion(question._id)}
    >
      <div className="trigger"></div>
      <div className="trigger"></div>
      <div className="trigger"></div>
      <div className="trigger"></div>
      <div className="trigger"></div>
      <div className="trigger"></div>
      <div className="trigger"></div>
      <div className="trigger"></div>
      <div className="trigger"></div>
      
      <div className="card">
        <img
          src={image}
          className="img-fluid"
          alt="image"
          height="150px"
          width="150px"
          style={{
            position: "absolute",
            transform: "translate(50%,-115%)",
          }}
        />
        <div className="frame">
          <div className="d-flex flex-column ml-4 mt-2 pt-0">
            <span
              className={`question-name-span ${
                question.type ? "question-warm-span" : "question-blue-span"
              }`}
            >
              {question.name}
            </span>
            <span>
              No. of questions : <b>{question.total_mcqs}</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
