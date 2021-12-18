import React, { useEffect } from "react";
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
import { useState } from "react";
import { Link } from "react-router-dom";
import InputReducer from "../../../../../Reducer/InputReducer";
import helperService from "../../../../../../services/helperService";
import { useContext } from "react";
import { AuthContext } from "../../../../../../contexts/AuthContext";
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
  const [authState] = useContext(AuthContext);
  const [testcases, setTestcases] = useState({
    sample: [],
    hidden: [],
  });
  const [testcase, setTestcase] = useState({
    input: "",
    output: "",
  });
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
  const addTestcase = () => {
    console.log(testcases, testcase);
    if (checked) {
      setTestcases({ ...testcases, hidden: [...testcases?.hidden, testcase] });
    } else {
      setTestcases({ ...testcases, sample: [...testcases?.sample, testcase] });
    }
  };
  const createTestcase = async () => {
    try {
      const { data, status } = await helperService.createTestcase(
        { question_id: authState?.challenge?._id, testcase: testcases },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 201) {
        if (data?.testcases.length > 0) setTestcases(data.testcases);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(authState?.challenge?.testcases?.testcases);
      setTestcases(authState?.challenge?.testcases?.testcases || {
        sample: [],
        hidden: [],
      });
  }, [authState]);
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
      <h1>Sample</h1>
      {testcases?.sample?.map((testcase) => (
        <div class="text_hovering_cards text_hovering_cards-1 d-flex flex-wrap align-items-center justify-content-center m-1">
          <div class="text_hovering_card text_hovering_card">
            <div class="text_hovering_card_content">
              <section>
                <span class="section_left">
                  <h3>{testcase.input}</h3>
                  <h5>{testcase.output}</h5>
                </span>
                <span class="section_right">
                  <Link
                    to="/challenges/challenges-dashboard/create-challenge"
                    class="card_but"
                  >
                    <i class="fa fa-pen"></i>
                  </Link>
                </span>
              </section>
            </div>
          </div>
        </div>
      ))}
      <h1>Hidden </h1>
      {testcases?.hidden.map((testcase) => (
        <div class="text_hovering_cards text_hovering_cards-1 d-flex flex-wrap align-items-center justify-content-center m-1">
          <div class="text_hovering_card text_hovering_card">
            <div class="text_hovering_card_content">
              <section>
                <span class="section_left">
                  <h3>{testcase.input}</h3>
                  <h5>{testcase.output}</h5>
                </span>
                <span class="section_right">
                  <Link
                    to="/challenges/challenges-dashboard/create-challenge"
                    class="card_but"
                  >
                    <i class="fa fa-pen"></i>
                  </Link>
                </span>
              </section>
            </div>
          </div>
        </div>
      ))}
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
            <InputReducer
              fullWidth
              id="outlined-multiline-static"
              label="Enter Input format"
              multiline
              rows={4}
              variant="outlined"
              onClickHandler={(value) =>
                setTestcase({ ...testcase, input: value })
              }
            />
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            <InputReducer
              fullWidth
              id="outlined-multiline-static"
              label="Enter Output format"
              multiline
              rows={4}
              variant="outlined"
              onClickHandler={(value) =>
                setTestcase({ ...testcase, output: value })
              }
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
          <Button onClick={addTestcase} color="primary" variant="contained">
            ADD TESTCASE
          </Button>
          <Button onClick={createTestcase} color="primary" variant="contained">
            SAVE TESTCASES
          </Button>
          <Button onClick={handleClose} color="primary">
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TestCase;
