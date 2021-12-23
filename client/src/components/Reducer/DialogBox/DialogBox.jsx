import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CustomButton from "../CustomButton/CustomButton";
import WarningGif from "../../Images/dribbble_1.gif";
const DialogBox = (props) => {
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
            <p>{props.bodyMsg}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mb-2">
          <CustomButton
            className="btn-hover color-11 mt-1"
            onClickHandler={props.handleOpen}
          >
            <i className="fas fa-times pr-2 pl-2"></i> YES
          </CustomButton>
          <CustomButton
            className="btn-grad mt-1 mx-2"
            onClickHandler={props.handleClose}
          >
            <i className="fas fa-times pr-2 pl-2"></i> NO
          </CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogBox;
