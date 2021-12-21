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
import CustomButton from "../../../../Reducer/CustomButton/CustomButton";

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
const AddUser = (props) => {
  console.log(props);
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
    //Regex
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
<<<<<<< HEAD
    let charRegex = /^[A-Za-z0-9 ]+$/;
    if (
      charRegex.test(user.name) &&
      emailRegex.test(user.email) &&
      user.regno.length === 7 &&
      user.phone_no.length === 10 &&
      user.stream_id !== "" &&
      user.course_id !== "" &&
      user.gender_id !== "" &&
      user.college_id !== ""
    ) {
      props.snackBar("User Created , Have Fun !!!", "success");
      console.log("user created !!");
    } else {
      props.snackBar(
        "Invalid Details , Kindly check the entered details",
        "error"
      );
      console.log("Having errors !!");
=======
    let charRegex =  /^[A-Za-z0-9]+$/;
  
    if(!user.name.length >=3 && !user.name.length <=25){
      props.snackBar("Username is Incorrect","error")
      return;
    }
    if(user.regno.length !== 7){
      props.snackBar("Please check the register Number","error");
      return;
    }
    if(user.stream_id === ""){
      props.snackBar("Stream is not selected","error")
      return;
    }
    if(user.course_id === ""){
      props.snackBar(" Course is not selected","error")
      return
    }
    if(user.college_id === ""){
      props.snackBar("College is not selected","error")
      return
    }
    if(!emailRegex.test(user.email)){
      props.snackBar("Email is Incorrect","error")
      return;
>>>>>>> 0bfa435ad86ca84ddc5b8a6de025565feb5ba909
    }
    if(user.phone_no.length !== 10){
      console.log(user.phone_no.length );
      props.snackBar("Phone Number is Incorrect","error")
      return;
    }
    if(user.gender_id === ""){
      props.snackBar("Gender is not Selected","error")
      return;
    }
    
    try {
      console.log({
        ...user,
        college_id: user.college_id,
        course_id: user.course_id,
        batch_id: `${user.batch_id.substring(0, 4)}-${user.batch_id.substring(user.batch_id.length-4, user.batch_id.length)}`,
      });
      const { status, data } = await helperService.createUser(
        {
          ...user,
          college_id: user.college_id,
          batch_id: `${user.batch_id.substring(0, 4)}-${user.batch_id.substring(user.batch_id.length-4, user.batch_id.length)}`,
        },
        { headers: { Authorization: authState?.user?.token } }
      );
      if (status === 201) {
        console.log(data, status);
        props.snackBar("Successfully user created", "success");
      }
    } catch (err) {
      props.snackBar(err.data, "error");

    }
  };
  return (
    <div className="container">
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
                onClickHandler={(value) => setUser({ ...user, name: value.trim() })}
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
                onClickHandler={(value) => setUser({ ...user, regno: value.trim() })}
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
                array={["Computer Science & Engineering", "Information Technology", "Civil Engineering"]}
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
                array={["KSR College of Engineering", "KSR College of Technology", "KSR Institute for Engineering & Technology"]}
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
                onClickHandler={(value) => setUser({ ...user, email: value.trim() })}
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
            <div className="col-md-6 p-1">
            <SelectReducer
                       className={classes.fieldColor} 
                array={["2018-2022", "2019-2023","2020-2024","2021-2025","2022-2026"]}
                name="batch year"
                label="Batch year"
                handleSelect={(e) =>
                  setUser({ ...user, batch_id: e.target.value })
                }
                 value={user.batch_id}
              />
            </div>
            
          </div>
          <CustomButton
            className="btn-hover color-11 mt-4"
            onClickHandler={createUser}
          >
            <i className="fas fa-plus pr-2 pl-2"></i>CREATE USER
          </CustomButton>
        </div>
        <div className="col-md-4 p-2 border m-1">
          <DropFileInput
            onFileChange={onFileChange}
            snackBar={props.snackBar}
          />
        </div>
      </div>
    </div>
  );
};

export default AddUser;
