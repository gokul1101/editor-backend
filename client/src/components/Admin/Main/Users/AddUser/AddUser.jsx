import React, { useState } from "react";
import InputReducer from "../../../../Reducer/InputReducer";
import DropFileInput from "./DropFileInput/DropFileInput";
import SelectReducer from "../../../../Reducer/SelectReducer/SelectReducer";
import "../../../../Student/Main/Dashboard/Dashboard.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import helperService from "../../../../../services/helperService";
import { useContext } from "react";
import { AuthContext } from "../../../../../contexts/AuthContext";
const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #1E2D64",
  },
  fieldColor: {
    width: "100%",
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#00511B",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#00511B",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "#00511B",
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
const colleges = {
  KSRCE: "KSR College of Engineering",
  KSRCT: "KSR College of Technology",
  KSRIET: "KSR Institute for Engineering & Technology",
};
const courses = {
  CSE: "Computer Science & Engineering",
  IT: "Information Technology",
  ECE: "Electronics and Communication Engineering",
  EEE: "Electrical & Electronics Engineering",
  CIVIL: "Civil Engineering",
  MECH: "Mechanical Engineering",
  SF: "Safety & Fire Engineering",
  AUTO: "Automobile Engineering",
};
const AddUser = () => {
  const [authState] = useContext(AuthContext);
  const [user, setUser] = useState({
    regno: "",
    name: "",
    email: "",
    gender_id: "",
    stream_id: "",
    course_id: "",
    college_id: "",
    phone_no: "",
  });
  const [batchStart, setBatchStart] = useState("");
  const [batchEnd, setBatchEnd] = useState("");
  const classes = useStyles();

  const onFileChange = async (files) => {
    try {
      const { data, status } = await helperService.createBulkUsers(
        {},
        { headers: { Authorization: authState?.user?.token } }
      );
      if (status === 201) {
      }
    } catch (err) {
      console.log(err);
    }
  };
  const createUser = async () => {
    try {
      console.log({
        ...user,
        college_id: colleges[user.college_id],
        course_id: courses[user.course_id],
        batch_id: `${batchStart.substring(0, 4)}-${batchEnd.substring(0, 4)}`,
      });
      const { status, data } = await helperService.createUser(
        {
          ...user,
          college_id: colleges[user.college_id],
          course_id: courses[user.course_id],
          batch_id: `${batchStart.substring(0, 4)}-${batchEnd.substring(0, 4)}`,
        },
        { headers: { Authorization: authState.user.state } }
      );
      if (status === 201) {
        console.log(data, status);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container-fluid">
      <p className="text-left dash-title-category pb-2">Add Details *</p>
      <div className="col p-0" style={{ marginTop: "-20px" }}>
        <div className="hr">
          <hr className="col p-0" />
        </div>
        <div className="d-flex justify-content-between question-outoff p-0 mb-3 w-100">
          <span className="text-muted">
            Create user as a individual data \ or through the bulk upload
          </span>
          <span className="text-info font-weight-bolder">
            Bulk upload Excel file
          </span>
        </div>
      </div>
      <div className="d-flex">
        <div className="col-md-8 p-2 border m-1">
          <div className="d-flex mt-2 mb-2">
            <div className="col-md-6 p-1">
              <InputReducer
                className={classes.fieldColor}
                label="Name"
                placeholder="Name"
                name="Name"
                type="text"
                value={user.name}
                onClickHandler={(value) => setUser({ ...user, name: value })}
              />
            </div>
            <div className="col-md-6 p-1">
              <InputReducer
                className={classes.fieldColor}
                placeholder="Register Number"
                label="Register Number"
                name="Register Number"
                type="text"
                value={user.regno}
                onClickHandler={(value) => setUser({ ...user, regno: value })}
              />
            </div>
          </div>
          <div className="d-flex mt-2 mb-2">
            <div className="col-md-6 p-1">
              <SelectReducer
                className={classes.fieldColor}
                array={["B.E", "B.Tech"]}
                name="Stream"
                value={user.stream_id}
                handleSelect={(e) =>
                  setUser({ ...user, stream_id: e.target.value })
                }
                // value = {user.regno}
                // onClickHandler = {(value) => setUser({...user,regno:value})}
              />
            </div>
            <div className="col-md-6 p-1">
              <SelectReducer
                className={classes.fieldColor}
                array={["CSE", "IT", "CIVIL"]}
                name="Course Name"
                handleSelect={(e) =>
                  setUser({ ...user, course_id: e.target.value })
                }
                value={user.course_id}
              />
            </div>
          </div>
          <div className="d-flex mt-2 mb-2">
            <div className="col-md-6 p-1">
              <SelectReducer
                value={user.college_id}
                className={classes.fieldColor}
                array={["KSRCT", "KSRCE", "KSRIET"]}
                name="College Name"
                handleSelect={(e) =>
                  setUser({ ...user, college_id: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 p-1">
              <InputReducer
                className={classes.fieldColor}
                placeholder="Email"
                label="Email"
                name="Email"
                type="email"
                value={user.email}
                onClickHandler={(value) => setUser({ ...user, email: value })}
              />
            </div>
          </div>

          <div className="d-flex mt-2 mb-2">
            <div className="col-md-6 p-1">
              <InputReducer
                className={classes.fieldColor}
                placeholder="Phone number"
                label="Phone number"
                name="Phone number"
                type="text"
                value={user.phone_no}
                onClickHandler={(value) =>
                  setUser({ ...user, phone_no: value })
                }
              />
            </div>
            <div className="col-md-6 p-1">
              <SelectReducer
                className={classes.fieldColor}
                array={["male", "female"]}
                name="Gender"
                handleSelect={(e) =>
                  setUser({ ...user, gender_id: e.target.value })
                }
                value={user.gender_id}
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
                value={batchStart}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setBatchStart(e.target.value)}
              />
            </div>
            <div className="col-md-4 p-1">
              <TextField
                id="date"
                label="Batch ends"
                type="month"
                defaultValue="2017-05-24"
                value={batchEnd}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                // value = {}
                onChange={(e) => setBatchEnd(e.target.value)}
              />
            </div>
          </div>
          <button className="loop-btn mt-3 pr-2 pl-2 ml-3" onClick={createUser}>
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
