import { Snackbar, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import helperService from "../../../../../../services/helperService";
import InputReducer from "../../../../../Reducer/InputReducer";
import SelectReducer from "../../../../../Reducer/SelectReducer/SelectReducer";
import "./CreateChallenge.css";
const CreateChallenge = (props) => {
  const [authState] = useContext(AuthContext);
  const history = useHistory();
  const { id } = useParams();
  const [challenge, setChallenge] = useState({});
  const createChallenge = async () => {
    try {
      const { status } = await helperService.createChallenge(
        { ...challenge, contest_id: id },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 201) {
        history.push(`/contests/${id}/challenges`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateChallenge = async () => {
    try {
      const { data, status } = await helperService.updateQuestion(
        {
          ...challenge,
          id: authState?.challenge?._id,
          contest_id: authState?.challenge?.contest_id,
        },
        {
          headers: { Authorization: authState.user.token },
        }
      );
      if (status === 201) {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setChallenge({
      name: authState?.challenge?.name,
      type_id: "problem",
      contest_id: authState?.challenge?._id,
      statement: authState?.challenge?.statement,
      description: authState?.challenge?.description,
      input_format: authState?.challenge?.input_format,
      output_format: authState?.challenge?.output_format,
      constraints: authState?.challenge?.constraints,
      difficulty_id: authState?.challenge?.difficulty_id.level,
      max_score: authState?.challenge?.max_score,
    });

    return () => {
      if (authState?.challenge) setChallenge({});
    };
  }, [authState]);
  useEffect(() => {
    console.log(challenge);
  }, [challenge]);
  return (
    <div
      className="container-fluid"
      style={{ overflowY: "scroll", height: "100vh" }}
    >
      <p className="text-left dash-title-category pb-2">
        {props?.title ? props?.title : "Create Challenge"}
      </p>
      <div className="d-flex flex-column mb-5">
        <div className="d-flex mt-2 mb-2">
          <span className="contest-line-height mr-2 col-md-3">
            Challenge name <span className="contest-star">*</span>
          </span>
          <div className="col-md-7">
            <InputReducer
              label="Challenge name"
              name="Challenge name"
              type="text"
              value={challenge.name}
              InputLabelProps={{
                shrink: true,
              }}
              onClickHandler={(value) =>
                setChallenge({ ...challenge, name: value })
              }
            />
          </div>
        </div>
        <div className="d-flex mt-2 mb-2">
          <span className="contest-line-height mr-2 col-md-3">
            Description <span className="contest-star">*</span>
          </span>
          <div className="col-md-7">
            <InputReducer
              fullWidth
              id="outlined-multiline-static"
              label="Enter Description"
              multiline
              rows={10}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={challenge.description}
              onClickHandler={(value) =>
                setChallenge({ ...challenge, description: value })
              }
            />
          </div>
        </div>
        <div className="d-flex mt-2 mb-2">
          <span className="contest-line-height mr-2 col-md-3">
            Problem Statement <span className="contest-star">*</span>
          </span>
          <div className="col-md-7">
            <InputReducer
              fullWidth
              id="outlined-multiline-static"
              label="Enter Problem Statement"
              multiline
              rows={10}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={challenge.statement}
              onClickHandler={(value) =>
                setChallenge({ ...challenge, statement: value })
              }
            />
          </div>
        </div>
        <div className="d-flex mt-2 mb-2">
          <span className="contest-line-height mr-2 col-md-3">
            Input format <span className="contest-star">*</span>
          </span>
          <div className="col-md-7">
            <InputReducer
              fullWidth
              id="outlined-multiline-static"
              label="Enter Input format"
              multiline
              rows={7}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={challenge.input_format}
              onClickHandler={(value) =>
                setChallenge({ ...challenge, input_format: value })
              }
            />
          </div>
        </div>
        <div className="d-flex mt-2 mb-2">
          <span className="contest-line-height mr-2 col-md-3">
            Output format <span className="contest-star">*</span>
          </span>
          <div className="col-md-7">
            <InputReducer
              fullWidth
              id="outlined-multiline-static"
              label="Enter Output format"
              multiline
              rows={7}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={challenge.output_format}
              onClickHandler={(value) =>
                setChallenge({ ...challenge, output_format: value })
              }
            />
          </div>
        </div>
        <div className="d-flex mt-2 mb-2">
          <span className="contest-line-height mr-2 col-md-3">
            Constraints <span className="contest-star">*</span>
          </span>
          <div className="col-md-7">
            <InputReducer
              fullWidth
              id="outlined-multiline-static"
              label="Constraints"
              multiline
              InputLabelProps={{
                shrink: true,
              }}
              value={challenge.constraints}
              onClickHandler={(value) =>
                setChallenge({ ...challenge, constraints: value })
              }
            />
          </div>
        </div>
        <div className="d-flex mt-2 mb-2">
          <span className="contest-line-height mr-2 col-md-3">
            Difficulty <span className="contest-star">*</span>
          </span>
          <div className="col-md-7">
            <SelectReducer
              value={challenge.difficulty_id}
              defaultValue={challenge.difficulty_id}
              className="w-100"
              array={["easy", "medium", "hard"]}
              name="Difficulty Level"
              handleSelect={(e) => {
                console.log(e.target.value);
                setChallenge({ ...challenge, difficulty_id: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="d-flex mt-2 mb-2">
          <span className="contest-line-height mr-2 col-md-3">
            Max Score <span className="contest-star">*</span>
          </span>
          <div className="col-md-7">
            <InputReducer
              fullWidth
              type="number"
              label="Max Score"
              InputLabelProps={{
                shrink: true,
              }}
              value={challenge.max_score}
              onClickHandler={(value) =>
                setChallenge({ ...challenge, max_score: value })
              }
            />
          </div>
        </div>
        <div className="my-5">
          <button
            className="float-right mt-3 mb-5 btn-hover pr-1 pl-1 color-11"
            color="primary"
            variant="contained"
            onClick={props?.title ? updateChallenge : createChallenge}
          >
            {props?.title ? props?.title.toUpperCase() : "CREATE CHALLENGE"}
          </button>
        </div>
        {/* <div className="d-flex mt-2 mb-5">
          <span className="contest-line-height mr-2 col-md-3">
            Tags <span className="contest-star">*</span>
          </span>
          <div className="col-md-7">
            <div className="tags-input">
              <ul id="tags">
                {tags.map((tag, index) => (
                  <li key={index} className="tag">
                    <span className="tag-title">{tag}</span>
                    <span
                      className="tag-close-icon"
                      onClick={() => removeTags(index)}
                    >
                      x
                    </span>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                onKeyUp={(event) =>
                  event.key === "Enter" ? addTags(event) : null
                }
                placeholder="Press enter to add tags"
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CreateChallenge;
