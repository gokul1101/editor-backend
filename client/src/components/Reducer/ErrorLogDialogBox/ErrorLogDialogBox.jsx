import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import { useMediaQuery, useTheme } from "@material-ui/core";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ErrorLogDialogBox = ({ open, handleClose, log }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="sm"
      fullWidth
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{"Error logs"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <span className="model-correct p-2">
          <i className="fas fa-check-circle pr-3 pl-3"></i>
            {+log?.totalLogs - +log?.errorLogs?.length} students data
            created successfully
          </span>
        </DialogContentText>
        <DialogContentText id="alert-dialog-slide-description">
          <span className="model-wrong p-2">
            <i className="fas fa-bug pr-3 pl-3"></i>
            {+log?.errorLogs?.length} students data having some error
          </span>
        </DialogContentText>
        <DialogContentText id="alert-dialog-slide-description" className="mt-3">
          <div className="p-2 d-flex flex-wrap">
            {log?.errorLogs?.map((log) => (
              <Chip key={log} label={log} className="m-1" />
            ))}
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ErrorLogDialogBox;
