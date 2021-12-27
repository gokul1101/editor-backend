import React, { useContext, useEffect, useState } from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import "./ContestQuizzes.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Button } from "@material-ui/core";
import InputReducer from "../../../../../Reducer/InputReducer";
import helperService from "../../../../../../services/helperService";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { Link, useParams } from "react-router-dom";
import CustomButton from "../../../../../Reducer/CustomButton/CustomButton";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ContestQuizzes = (props) => {
  console.log(props);
  const { id } = useParams();
  const [authState] = useContext(AuthContext);
  const [quizName, setQuizName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [quizzArr, setQuizzArr] = useState([]);
  const createQuizz = async () => {
    if(quizName?.length <= 0){
      props.snackBar("Field is Empty","error")
      return;
    }

    try {
      const {
        status,
        data: { quiz,message },
      } = await helperService.createQuizz(
        { name: quizName, contest_id: id },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 201) {
        // TODO:
        console.log(quiz);
        props.snackBar(message,"success")
        // authDispatch({type:"SET_QUIZZ",payload:{...quiz}})
        setQuizzArr((existing) => [...existing, quiz]);
        
      }
    } catch (err) {
      console.log(err)
      props.snackBar(err?.data, "error");
    }finally{
      setQuizName("")
      setOpen(false);
    }
  };
  const fetchQuizzes = async () => {
    try {
      const { status,data : { message , quizzes}} = await helperService.getQuizzes(
        { id },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 200) {
     
        props.snackBar(message ,"success")
        setQuizzArr(quizzes);
        setOpen(false);
      }
    } catch (err) {
      props.snackBar(err,"error")
      console.log(err); 
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);
  return (
    <div className="container mt-5">
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
      <CustomButton
        className="btn-hover color-11 mt-4"
        onClickHandler={handleClickOpen}
      >
        <i className="fas fa-plus pr-2 pl-2"></i>ADD QUIZZES
      </CustomButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" className="text-highlight">
          {"Create contest quiz"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className="d-flex flex-column">
              <label>Create Quiz :</label>
              <InputReducer value={quizName} onClickHandler={setQuizName} />
            </div>
            <p className="text-muted mt-3">
              Note : Should contain a valid quiz name , Please don't use
              previous names
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={createQuizz}
            className="btn btn-sucess bb-2"
            variant="contained"
          >
            ADD
          </Button>
          <Button onClick={handleClose} color="primary">
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
      <div className="challenge-chips d-flex flex-wrap border p-2 mt-4">
        {quizzArr?.length > 0 ? (
          quizzArr?.map((e) => {
            return (
              <div className="create-con" key={e._id}>
                <div className="p-2 mr-2 ml-2 quizzes-chip">
                  <DeleteOutlineIcon />
                  <Link
                    style={{ color: "white" }}
                    to={`/quizzes/${e._id}/add-question`}
                  >
                    <span className="pl-2">{e.name}</span>
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

export default ContestQuizzes;
