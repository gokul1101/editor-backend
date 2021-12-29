// import { Snackbar } from "@material-ui/core";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import helperService from "../../../../../../services/helperService";
import CustomButton from "../../../../../Reducer/CustomButton/CustomButton";
import GoBack from "../../../../../Reducer/GoBack/GoBack";
import InputReducer from "../../../../../Reducer/InputReducer";
import SelectReducer from "../../../../../Reducer/SelectReducer/SelectReducer";
import "./CreateChallenge.css";
const CreateChallenge = (props) => {
  const [authState] = useContext(AuthContext);
  const history = useHistory();
  const { id } = useParams();
  const [challenge, setChallenge] = useState({});
  const [difficultyId, setDifficultyId] = useState("");
  const createChallenge = async () => {
    if (challenge?.name?.length === 0) {
      props.snackBar("Challenge Name is Empty", "error");
      return;
    }
    if (challenge?.description?.length === 0) {
      props.snackBar("Challenge Description is Empty", "error");
      return;
    }
    if (challenge?.statement?.length === 0) {
      props.snackBar("Challenge Statement is Empty", "error");
      return;
    }

    if (challenge?.input_format?.length === 0) {
      props.snackBar("Input is Empty", "error");
      return;
    }
    if (challenge?.output_format?.length === 0) {
      props.snackBar("Output is Empty", "error");
      return;
    }
    if (challenge?.constraints?.length === 0) {
      props.snackBar("contraints is Empty", "error");
      return;
    }
    if (!challenge?.difficulty_id) {
      props.snackBar("Difficulty is not Selected", "error");
      return;
    }
    if (!challenge?.max_score || challenge.max_score < 0) {
      props.snackBar("Maximum Score is Empty", "error");
      return;
    }
    try {
      const { status } = await helperService.createChallenge(
        { ...challenge, contest_id: id },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 201) {
        props.snackBar("Challenge is created Successfully", "success");
        history.push(`/contests/${id}/challenges`);
      }
    } catch (err) {
      props.snackBar(err?.data?.message, "error");
    }
  };
  const updateChallenge = async () => {
    if (challenge.name.length <=0) {
      props.snackBar("Challenge Name is Empty", "error")
      return
    }
    if(challenge.description.length <=0){
      props.snackBar("Challenge Description is Empty", "error")
      return;
    }
    if(challenge.statement.length <=0){
      props.snackBar("Challenge Statement is Empty", "error")
      return;
    }

   if(challenge.input_format.length <=0){
     props.snackBar("Input is Empty","error")
     return;
   } 
   if(challenge.output_format.length <= 0){
    props.snackBar("Output is Empty","error")
    return;
  } 
  if(challenge.constraints.length <=0){
    props.snackBar("contraints is Empty","error")
    return;
  } 
  if(challenge.difficulty_id === undefined){
    props.snackBar("Difficulty is not Selected","error")
    return;
  } 
  if(challenge.max_score === undefined){
    props.snackBar("Maximum Score is Empty","error")
    return;
  } 
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
      if (status === 200) {
        props.snackBar(data.message,"success")
        
      }
    } catch (err) {
      props.snackBar(err.data, "error");
    }
  };
  useEffect(() => {
    setChallenge({
      name: authState?.challenge?.name ?? "",
      type_id: "problem",
      contest_id: authState?.challenge?._id ?? "",
      statement: authState?.challenge?.statement ?? "",
      description: authState?.challenge?.description ?? "",
      input_format: authState?.challenge?.input_format ?? "",
      output_format: authState?.challenge?.output_format ?? "",
      constraints: authState?.challenge?.constraints ?? "",
      difficulty_id: authState?.challenge?.difficulty_id?.level,
      max_score: authState?.challenge?.max_score,
    });
    setDifficultyId(authState?.challenge?.difficulty_id?.level);
    // return () => {
    //   if (authState?.challenge) setChallenge({});
    // };
  }, [authState]);
  return (
    <div className="container" style={{ height: "100vh", overflowY: "scroll" }}>
      <div className="d-flex">
        <GoBack onClickHandler={() => history.goBack()} />
        <p className="text-left dash-title-category mx-4 mt-2">
          {props?.title ? props?.title : "Create Challenge"}
        </p>
      </div>

      <div className="d-flex flex-column mb-5">
        <div className="d-flex mt-2 mb-2">
          <span className="contest-line-height mr-2 col-md-4">
            Challenge name <span className="contest-star">*</span>
          </span>
          <div className="col-md-8">
            <InputReducer
              label="Challenge name"
              name="Challenge name"
              type="text"
              value={challenge?.name}
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
          <span className="contest-line-height mr-2 col-md-4">
            Problem Statement <span className="contest-star">*</span>
          </span>
          <div className="col-md-8">
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
          <span className="contest-line-height mr-2 col-md-4">
            Input format <span className="contest-star">*</span>
          </span>
          <div className="col-md-8">
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
          <span className="contest-line-height mr-2 col-md-4">
            Output format <span className="contest-star">*</span>
          </span>
          <div className="col-md-8">
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
          <span className="contest-line-height mr-2 col-md-4">
            Description <span className="contest-star">*</span>
          </span>
          <div className="col-md-8">
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
          <span className="contest-line-height mr-2 col-md-4">
            Constraints <span className="contest-star">*</span>
          </span>
          <div className="col-md-8">
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
          <span className="contest-line-height mr-2 col-md-4">
            Difficulty <span className="contest-star">*</span>
          </span>
          <div className="col-md-8">
            <SelectReducer
              value={difficultyId}
              defaultValue={difficultyId}
              className="w-100"
              array={["easy", "medium", "hard"]}
              name="Difficulty Level"
              handleSelect={(e) => {
                setDifficultyId(e.target.value);
                setChallenge({ ...challenge, difficulty_id: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="d-flex mt-2 mb-2">
          <span className="contest-line-height mr-2 col-md-4">
            Max Score <span className="contest-star">*</span>
          </span>
          <div className="col-md-8">
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
        <div className="m-0">
          <CustomButton
            className="btn-hover color-11 mt-2 mb-5 float-right"
            onClickHandler={props?.title ? updateChallenge : createChallenge}
          >
            <i className="fas fa-plus pr-2 pl-2"></i>{" "}
            {props?.title ? props?.title.toUpperCase() : "CREATE CHALLENGE"}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default CreateChallenge;
