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
import "./TestCase.css";
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
let type = null;
let oldTestcase = null;
const testcasesDefaultValue = {
  id: null,
  sample: [],
  hidden: [],
};
const TestCase = (props) => {
  const [authState] = useContext(AuthContext);
  const [update, setUpdate] = useState(false);
  const [testcases, setTestcases] = useState(testcasesDefaultValue);
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
    // props.snackBar("Sucessfully added","success")
    let DBTestcase = {};
    if (checked) {
      DBTestcase = {
        hidden: { ...testcase, output: testcase.output.replace(/\n+$/, "") },
      };
    } else {
      DBTestcase = {
        sample: { ...testcase, output: testcase.output.replace(/\n+$/, "") },
      };
    }
    createTestcase(DBTestcase);
    DBTestcase = {};
  };
  const createTestcase = async (DBTestcase) => {
    try {
      const { data, status } = await helperService.createTestcase(
        { question_id: authState?.challenge?._id, testcase: DBTestcase },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 201) {
        setTestcases({
          ...testcases,
          sample: DBTestcase.sample
            ? [...testcases.sample, { ...DBTestcase.sample }]
            : [...testcases.sample],
          hidden: DBTestcase.hidden
            ? [...testcases.hidden, { ...DBTestcase.hidden }]
            : [...testcases.hidden],
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTestcase({ input: "", output: "" });
      setOpen(false);
    }
  };

  //edit and delete the testcases
  const updateTestcaseHandler = (testcaseType, testcase) => {
    setOpen(true);
    setUpdate(true);
    oldTestcase = testcase;
    type = testcaseType;

    setTestcase(testcase);
  };
  const updateTestcase = async () => {
    try {
      console.log(type, oldTestcase);
      const { data, status } = await helperService.updateTestcase(
        {
          testcase_id: authState.challenge.testcases.id,
          type,
          oldTestcase,
          testcase: testcase,
        },
        { headers: { Authorization: authState.user.token } }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTestcaseHandler = () => {
    props.snackBar(
      "Selected Hidden Test case is deleted successfully",
      "success"
    );
  };

  useEffect(() => {
    setTestcases(authState?.challenge?.testcases || testcasesDefaultValue);
  }, [authState]);
  return (
    <div className="container">
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
        <button className="p-2 mt-3" onClick={handleClickOpen}>
          <i className="fas fa-plus pr-2 pl-2"></i>ADD TESTCASE
        </button>
      </div>
      <h4 className="m-2 p-2 text-uppercase text-center font-weight-bolder">
        Sample Test Cases
      </h4>
      {testcases?.sample?.length === 0 ? (
        <div className="alert alert-primary" role="alert">
          Till now No Sample test Case is added
        </div>
      ) : (
        <div className="d-flex p-2 flex-wrap">
          {testcases?.sample?.map((testcase) => (
            <div className="p-2">
              <div
                className="card test-card p-3"
                style={{
                  height: "250px",
                  width: "300px",
                  borderBottom: "5px solid #21A366",
                }}
              >
                <div className="edit-delete d-flex ml-auto p-2 m-2">
                  <i
                    className="fas fa-edit"
                    onClick={() => updateTestcaseHandler("sample", testcase)}
                  ></i>
                  <i
                    className="fas fa-trash ml-2 "
                    onClick={() => deleteTestcaseHandler("sample", testcase)}
                  ></i>
                </div>
                <div className="input">
                  <h4 className="font-weight-bolder text-highlight">Input</h4>
                  <h6>{testcase.input}</h6>
                </div>
                <div className="output">
                  <h4 className="font-weight-bolder text-highlight">Output</h4>
                  <h6>
                    <pre>
                      {testcase?.output && JSON.parse(testcase?.output)}
                    </pre>
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h4 className="m-2 p-2  text-uppercase text-center font-weight-bolder">
        Hidden Test Cases
      </h4>
      {testcases?.hidden?.length === 0 ? (
        <div className="alert alert-primary" role="alert">
          Till now No Hidden test Case is added
        </div>
      ) : (
        <div className="d-flex flex-wrap">
          {testcases?.hidden?.map((testcase) => (
            <div className="p-2">
              <div
                className="card test-card p-3"
                style={{
                  height: "250px",
                  width: "300px",
                  borderBottom: "5px solid #21A366",
                }}
              >
                <div className="edit-delete d-flex ml-auto p-2 m-2">
                  <i
                    className="fas fa-edit"
                    onClick={() => updateTestcaseHandler("hidden", testcase)}
                  ></i>
                  <i
                    className="fas fa-trash ml-2 "
                    onClick={() => deleteTestcaseHandler("hidden", testcase)}
                  ></i>
                </div>
                <div className="input">
                  <h4 className="font-weight-bolder text-highlight">Input</h4>
                  <h6>{testcase.input}</h6>
                </div>
                <div className="output">
                  <h4 className="font-weight-bolder text-highlight">Output</h4>
                  <h6>
                    <pre>
                      {testcase?.output && JSON.parse(testcase?.output)}
                    </pre>
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
              value={testcase.input}
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
              value={testcase?.output && JSON.parse(testcase?.output)}
              onClickHandler={(value) =>
                setTestcase({ ...testcase, output: JSON.stringify(value) })
              }
            />
          </DialogContentText>
        </DialogContent>
        {!update && (
          <DialogContentText
            id="alert-dialog-slide-description"
            className="pl-4"
          >
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
        )}
        <DialogActions>
          <Button
            onClick={update ? updateTestcase : addTestcase}
            color="primary"
            variant="contained"
          >
            {update ? "UPDATE TESTCASE" : "ADD TESTCASE"}
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
