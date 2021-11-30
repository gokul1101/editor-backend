import React from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Button } from "@material-ui/core";
import InputReducer from "../../../../../Reducer/InputReducer";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ContestChallenges = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const addQuiz = () => {
    console.log("Quiz Added");
  };
  const eventArr = [
    { name: "November challenge 2021" },
    { name: "Java challenge 2021" },
    { name: "Python challenge 2021" },
  ];
  return (
    <div className="container">
      <div className="d-flex flex-column" style={{ marginTop: "40px" }}>
        <p className="text-left dash-title-category pb-2">Quiz Challenges</p>
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
      <div className="create-con">
        {/* <Link to="/contests/create-contest"> */}
        <button className="p-2 mt-3" onClick={handleClickOpen}>
          <i className="fas fa-plus pr-2 pl-2"></i>ADD CHALLENGES
        </button>
        {/* </Link> */}
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Create contest challenges"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className="d-flex">
              <label>Create Challenges</label>
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
        {eventArr.length > 0 ? (
          eventArr.map((e) => {
            return (
              <div className="create-con">
                <div className="p-2 mr-2 ml-2 quizzes-chip">
                  <DeleteOutlineIcon />
                  <span className="pl-2">{e.name}</span>
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
