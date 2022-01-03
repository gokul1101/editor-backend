import React, { useContext, useEffect } from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Button } from "@material-ui/core";
import InputReducer from "../../../../../Reducer/InputReducer";
import { Link, NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import helperService from "../../../../../../services/helperService";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import CustomButton from "../../../../../Reducer/CustomButton/CustomButton";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ContestChallenges = (props) => {
  const [authState, authDispatch] = useContext(AuthContext);
  const { id } = useParams();
  const [challenges, setChallenges] = useState([]);
  const fetchChallenges = async () => {
    try {
      const { data, status } = await helperService.getChallenges(
        { id },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 200) {
        setChallenges(data.challenges);
        props.snackBar(data.message,"success")
      }
    } catch (err) {
    }
  };
  const deleteQuestion = async (challenge) => {
    try {
      const { status } = await helperService.deleteQuestion(
        { ...challenge, type_id: "problem" },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 202) {
        props.snackBar("Question deleted successfully", "success");
        console.log(challenge,challenges)
        setChallenges(
          challenges.filter((ques) => ques._id !== challenge._id)
        );
      }
    } catch (err) {
      props.snackBar(err.data, "error");
    }
  };
  const [open, setOpen] = React.useState(false);



  const handleClose = () => {
    setOpen(false);
  };
  const addQuiz = () => {
  };
  useEffect(() => {
    fetchChallenges();
    authDispatch({ type: "REMOVE_CHALLENGE" });
  }, []);
  return (
    <div className="container mt-5">
      <div className="d-flex flex-column" style={{ marginTop: "40px" }}>
        <p className="text-left dash-title-category pb-2">Coding Challenges</p>
        <span className="create-con-text mt-1">
          Add quiz to the challenge to the contest by selecting quiz challenge
          from our library or create
        </span>
        <span className="create-con-text">
          of your own challenges here. To record your challenges, simply select
          the challenge and drag and
        </span>
        <span className="create-con-text">drop to the desired location </span>
      </div>
      <NavLink to={`/contests/${id}/challenges/create`}>
        <CustomButton className="btn-hover color-11 mt-4">
          <i className="fas fa-plus pr-2 pl-2"></i>ADD CHALLENGES
        </CustomButton>
      </NavLink>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Create contest quiz"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className="d-flex">
              <label>Create Challenge</label>
              <InputReducer />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={addQuiz} color="primary" variant="contained">
            ADD
          </Button>
          <Button onClick={handleClose} color="primary">
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
      <div className="challenge-chips d-flex flex-wrap border p-2 mt-4">
        {challenges?.length > 0 ? (
          challenges.map((challenge) => {
            return (
              <div className="create-con" key={challenge._id}>
                <div
                  className="p-2 mr-2 ml-2 quizzes-chip"
                  style={{
                    background: "#21A366",
                    color: "#fff",
                    borderRadius: "10px",
                  }}
                >
                  <DeleteOutlineIcon onClick = {() => deleteQuestion(challenge)}/>
                  <Link
                    to={`/challenges/${challenge._id}`}
                    style={{ color: "white" }}
                  >
                    <span className="pl-2">{challenge.name}</span>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <span>No changes have been made yet</span>
        )}
      </div>
    </div>
  );
};

export default ContestChallenges;
