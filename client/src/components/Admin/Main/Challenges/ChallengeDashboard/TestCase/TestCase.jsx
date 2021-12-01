import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { green } from "@material-ui/core/colors";
import { Button, FormControlLabel, TextField } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
const TestCase = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div className="d-flex flex-column" style={{ marginTop: "40px" }}>
        <p className="text-left dash-title-category pb-2">Create Testcase</p>
        <span className="create-con-text mt-1">
          Add testcase to the challenge to the contest by selecting challenge
          from our library or create
        </span>
        <span className="create-con-text">
          of your own challenges here. To record your challenges, simply select
          the challenge and drag and
        </span>
      </div>
      <div className="create-con">
        {/* <Link to="/contests/create-contest"> */}
        <button className="p-2 mt-3" onClick={handleClickOpen}>
          <i className="fas fa-plus pr-2 pl-2"></i>ADD TESTCASE
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
          {"Create your own TestCase"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Enter Input format"
              multiline
              rows={4}
              variant="outlined"
            />
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Enter Output format"
              multiline
              rows={4}
              variant="outlined"
            />
          </DialogContentText>
        </DialogContent>
        <DialogContentText id="alert-dialog-slide-description" className="pl-4">
          <FormControlLabel
            control={
              <GreenCheckbox
                checked={checked}
                onChange={handleChange}
                name="Hidden"
                color="primary"
              />
            }
            label="Enable Hidden"
          />
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TestCase;
