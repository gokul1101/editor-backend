import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import NotificationsActiveRoundedIcon from '@material-ui/icons/NotificationsActiveRounded';
import WarningGif from "../../../images/dribbble_1.gif";
import CustomButton from "../CustomButton/CustomButton";
const DialogBox = ({ localData, ...props }) => {
  const unSubmittedQuestions = () => {
    const data = localData();
    const questions = [
      ...data.unSubmittedChallenges,
      ...data.unSubmittedQuizzes,
    ];
    return questions;
  };
  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className="d-flex align-items-center justify-content-center">
            <img src={WarningGif} height={"50%"} width={"100%"} />
          </div>
        </DialogContent>
        <DialogContent className="d-flex align-items-center justify-content-center">
          <DialogContentText
            id="alert-dialog-description"
            className="text-dark"
          >
            {localData ? (
              <>
                <p className="font-weight-bold">
                  Some sections are not sumbitted!!!.
                </p>
                {unSubmittedQuestions().map((ques) => {
                  return (
                    <span className="badge badge-success font-weight-normal px-2 py-2 m-1">
                      {ques}
                    </span>
                  );
                })}
              </>
            ) : (
              <p className="font-weight-bold">{props.bodyMsg}</p>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mb-2">
          {props.warning ? (
            <CustomButton
              className="btn-hover color-11 mt-1"
              onClickHandler={props.handleClose}
            >
              <NotificationsActiveRoundedIcon/>Ok
            </CustomButton>
          ) : (
            <>
              <CustomButton
                className="btn-hover color-11 mt-1"
                onClickHandler={props.handleOpen}
              >
               <CheckCircleRoundedIcon/> YES
              </CustomButton>

              <CustomButton
                className="btn-grad mt-1 mx-2"
                onClickHandler={props.handleClose}
              >
                <HighlightOffRoundedIcon/> NO
              </CustomButton>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogBox;
