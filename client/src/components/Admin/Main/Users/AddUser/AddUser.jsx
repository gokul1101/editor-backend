import React from "react";
import InputReducer from "../../../../Reducer/InputReducer";
import DropFileInput from "./DropFileInput/DropFileInput";
import SelectReducer from "../../../../Reducer/SelectReducer/SelectReducer";
import "../../../../Student/Main/Dashboard/Dashboard.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
const AddUser = () => {
  const classes = useStyles();
  const onFileChange = (files) => {
    console.log(files);
  };
  return (
    <div className="">
      <p className="text-left dash-title-category pb-2">Add Details *</p>
      <div className="col p-0" style={{ marginTop: "-20px" }}>
        <div className="hr">
          <hr className="col p-0" />
        </div>
        <div className="d-flex justify-content-between question-outoff p-0 mb-3 w-100">
          <span>Create user</span>
          <span>Bulk upload Excel file</span>
        </div>
      </div>
      <div className="d-flex">
        <div className="col-md-8 p-2 border m-1">
          <div className="d-flex mt-2 mb-2">
            <div className="col-md-6 p-1">
              <InputReducer
                placeholder="Register Number"
                name="Register Number"
                type="text"
              />
            </div>
            <div
              className="col-md-6 p-1"
              style={{ position: "relative", left: "-7px", top: "-9px" }}
            >
              <SelectReducer array={["B.E", "B.Tech"]} name="Stream" />
            </div>
          </div>
          <div
            className="d-flex mt-2 mb-2"
            style={{ position: "relative", left: "-7px" }}
          >
            <div className="col-md-6 p-1">
              <SelectReducer
                array={["CSE", "IT", "CIVIL"]}
                name="Course name"
              />
            </div>
            <div className="col-md-6 p-1">
              <SelectReducer
                array={["KSRCT", "KSRCE", "KSRIET"]}
                name="Stream"
              />
            </div>
          </div>
          <div className="d-flex mt-3 mb-2">
            <div className="col-md-4 p-1">
              <TextField
                id="date"
                label="Batch starts"
                type="month"
                defaultValue="2017-05-24"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="col-md-4 p-1">
              <TextField
                id="date"
                label="Batch ends"
                type="month"
                defaultValue="2017-05-24"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
          <button className="loop-btn mt-3 pr-2 pl-2 ml-3">
            <i className="fas fa-plus pr-2 pl-2"></i>Create user
          </button>
        </div>
        <div className="col-md-4 p-2 border m-1">
          <DropFileInput onFileChange={onFileChange} />
        </div>
      </div>
    </div>
  );
};

export default AddUser;
