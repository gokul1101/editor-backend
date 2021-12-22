import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ErrorLogs = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="container">
      <p className="text-left dash-title-category pb-2 mt-5">Error Logs</p>
      <span className="create-con-text mt-1">
        Shows all the errors while creating the students as a bulk upload
      </span>
      <div className="mt-4 d-flex flex-column">
        <div className="d-flex upcoming-header border-top border-bottom mt-2 p-2 mb-1">
          <div className="col-md-3 text-center content-nav-title">
            ADMIN NAME
          </div>
          <div className="col-md-3 text-center content-nav-title">
            NO. OF LOGS
          </div>
          <div className="col-md-2 text-center content-nav-title">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="col-md-2 text-center content-nav-title">
            <i className="fas fa-times-circle"></i>
          </div>
          <div className="col-md-2 text-center content-nav-title">
            SHOW
            {/* <i className="fas fa-external-link-alt"></i> */}
          </div>
        </div>
        <div className="d-flex border-top border-bottom mt-1 p-2 mb-1">
          <div className="col-md-3 text-center content-nav-title">
            Dhanush Karthick
          </div>
          <div className="col-md-3 text-center content-nav-title">190</div>
          <div className="col-md-2 text-center content-nav-title">100</div>
          <div className="col-md-2 text-center content-nav-title">80</div>
          <div className="col-md-2 text-center content-nav-title">
            <i className="fas fa-external-link-alt" onClick={handleClickOpen}></i>
          </div>
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
            <DialogTitle id="alert-dialog-slide-title">
              {"Error logs"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <span className="model-correct p-2">
                  <i className="fas fa-check-circle pr-3 pl-3"></i>12 students
                  data added successfully
                </span>
              </DialogContentText>
              <DialogContentText id="alert-dialog-slide-description">
                <span className="model-wrong p-2">
                  <i className="fas fa-bug pr-3 pl-3"></i>12 students data
                  having some error
                </span>
              </DialogContentText>
              <DialogContentText
                id="alert-dialog-slide-description"
                className="mt-3"
              >
                <div className="p-2 d-flex flex-wrap">
                  <Chip label="1813015" className="m-1" />
                  <Chip label="1813015" className="m-1" />
                  <Chip label="1813015" className="m-1" />
                  <Chip label="1813015" className="m-1" />
                  <Chip label="1813015" className="m-1" />
                  <Chip label="1813015" className="m-1" />
                  <Chip label="1813015" className="m-1" />
                  <Chip label="1813015" className="m-1" />
                  <Chip label="1813015" className="m-1" />
                  <Chip label="1813015" className="m-1" />
                  <Chip label="1813015" className="m-1" />
                  <Chip label="1813015" className="m-1" />
                  <Chip label="1813015" className="m-1" />
                  <Chip label="1813015" className="m-1" />
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" variant="outlined">
                CLOSE
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ErrorLogs;
