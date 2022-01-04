import React from "react";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CreateIcon from "@material-ui/icons/Create";
const ContestTable = ({
  data,
  deleteQuestion,
  setUpdateQuestion,
  setQuestionName,
  handleClickOpen,
}) => {
  return (
    <div className="challenge-chips d-flex flex-wrap border p-2 mt-4">
      {data?.length > 0 ? (
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>{`${setUpdateQuestion ? "Quiz" : "Challenge"} Name`}</th>
              <th>Created At</th>
              <th>Max Score</th>
              <th>delete</th>
              {setUpdateQuestion ? <th>edit</th> : null}
            </tr>
          </thead>
          <tbody>
            {data?.map((question) => {
              return (
                <tr key={question._id}>
                  <td>
                    <Link
                      style={{ color: "white" }}
                      to={
                        setUpdateQuestion
                          ? `/quizzes/${question._id}/add-question`
                          : `/challenges/${question._id}/update`
                      }
                    >
                      <span className="pl-2 text-dark">{question.name}</span>
                    </Link>
                  </td>
                  <td>
                    {new Date(question?.created_at || "").toLocaleString()}
                  </td>
                  <td>{question.total_mcqs ?? question.max_score}</td>
                  <td>
                    <DeleteOutlineIcon
                      onClick={() => deleteQuestion(question)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                  {setUpdateQuestion ? (
                    <td>
                      <div
                        className="px-2"
                        onClick={() => {
                          setUpdateQuestion(true);
                          handleClickOpen();
                          setQuestionName({
                            id: question._id,
                            name: question.name,
                          });
                        }}
                      >
                        <CreateIcon style={{ cursor: "pointer" }} />
                      </div>
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <span>
          {setUpdateQuestion ? "Quizzes" : "Challenges"} not created yet.
        </span>
      )}
    </div>
  );
};

export default ContestTable;
