import React, { useContext, useEffect, useState } from "react";

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
import ContestTable from "../ContestTable/ContestTable";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ContestQuizzes = (props) => {
  const { id } = useParams();
  const [authState] = useContext(AuthContext);
  const [quizName, setQuizName] = useState({});
  const [open, setOpen] = React.useState(false);
  const [quizzArr, setQuizzArr] = useState([]);
  const [updateQuiz, setUpdateQuiz] = useState(false);
  const createQuizz = async () => {
    if (quizName?.name?.length <= 0) {
      props.snackBar("Field is Empty", "error");
      return;
    }

    try {
      const {
        status,
        data: { quiz, message },
      } = await helperService.createQuizz(
        { name: quizName.name, contest_id: id },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 201) {
        // TODO:
        props.snackBar(message, "success");
        // authDispatch({type:"SET_QUIZZ",payload:{...quiz}})
        setQuizzArr((existing) => [...existing, quiz]);
      }
    } catch (err) {
      props.snackBar(err?.data, "error");
    } finally {
      setQuizName({});
      setOpen(false);
    }
  };
  const fetchQuizzes = async () => {
    try {
      const {
        status,
        data: { message, quizzes },
      } = await helperService.getQuizzes(
        { id },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 200) {
        props.snackBar(message, "success");
        setQuizzArr(quizzes);
        setOpen(false);
      }
    } catch (err) {
      props.snackBar(err?.data, "error");
      console.log(err);
    }
  };
  const deleteQuiz = async (quiz) => {
    try {
      const payload = {};
      if (quiz._id) payload.id = quiz._id;
      else if (quiz.name) payload.name = quiz.name;
      const { data, status } = await helperService.deleteQuiz(payload, {
        headers: { Authorization: authState?.user?.token },
      });
      if (status === 202) {
        if (payload.id)
          setQuizzArr(quizzArr.filter((quiz) => quiz._id !== payload.id));
        else if (payload.name)
          setQuizzArr(quizzArr.filter((quiz) => quiz.name !== payload.name));
        props.snackBar(data.message, "success");
      }
    } catch (err) {
      props.snackBar(err.data, "error");
    }
  };
  const updateQuizName = async () => {
    try {
      const { data, status } = await helperService.updateQuiz(
        { name: quizName.name, id: quizName.id },
        { headers: { Authorization: authState?.user?.token } }
      );
      if (status === 200) {
        setQuizzArr(
          quizzArr.map((quiz) => {
            if (quiz.name !== quizName.name) return quizName;
            return quiz;
          })
        );
        props.snackBar(data.message, "success");
      }
    } catch (err) {
      props.snackBar(err.data, "error");
    }
    setQuizName({ name: "" });
    handleClose();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (updateQuiz) {
      setUpdateQuiz(false);
      setQuizName({ name: "" });
    }
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
          {updateQuiz ? "Update contest quiz" : "Create contest quiz"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className="d-flex flex-column">
              <label>{updateQuiz ? "Update Quiz :" : "Create Quiz :"}</label>
              <InputReducer
                value={quizName?.name}
                onClickHandler={(value) =>
                  setQuizName({ ...quizName, name: value })
                }
              />
            </div>
            <p className="text-muted mt-3">
              Note : Should contain a valid quiz name , Please don't use
              previous names
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={updateQuiz ? updateQuizName : createQuizz}
            className="btn btn-sucess bb-2"
            variant="contained"
          >
            {updateQuiz ? "UPDATE" : "ADD"}
          </Button>
          <Button onClick={handleClose} color="primary">
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
      <ContestTable
        data={quizzArr}
        deleteQuestion={deleteQuiz}
        setUpdateQuestion={setUpdateQuiz}
        setQuestionName={setQuizName}
        handleClickOpen={handleClickOpen}
      />
    </div>
  );
};

export default ContestQuizzes;
