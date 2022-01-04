import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import InputReducer from "../../../Reducer/InputReducer";
import SelectReducer from "../../../Reducer/SelectReducer/SelectReducer";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import CustomButton from "../../../Reducer/CustomButton/CustomButton";
import GoBack from "../../../Reducer/GoBack/GoBack";
import PasswordField from "../../../Reducer/PasswordField/PasswordField";
import { AuthContext } from "../../../../contexts/AuthContext";
const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #1E2D64",
  },
  margin: {
    marginTop: "100px",
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
}));
const Profile = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [authState, authDispatch] = useContext(AuthContext);
  const formSchema = {
    email: authState?.user?.email ?? "",
    regno: authState?.user?.regno ?? "",
    confirm_password: "",
    new_password: "",
    name: authState?.user?.name ?? "",
    phone_no: authState?.user?.phone_no ?? "",
    gender_id: authState?.user?.gender_id ?? "",
    stream_id: authState?.user?.stream_id ?? "",
    course_id: authState?.user?.course_id ?? "",
    college_id: authState?.user?.college_id ?? "",
    batch_id: authState?.user?.batch_id ?? "",
  };
  const [user, setUser] = useState(formSchema);
  const studentDetails = () => {
    setUser(formSchema);
  };
  useEffect(() => {
    props.setSideToggle(false);
    studentDetails();
  }, [authState]);
  const userEditedDetails = () => {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let username = /^[a-zA-Z\_]{3,25}$/;

    if (!username.test(user.name)) {
      props.snackBar("Username is Invalid", "error");
      return;
    }
    if (!emailRegex.test(user.email)) {
      props.snackBar("Email is Incorrect", "error");
      return;
    }
    if (user.phone_no.length !== 10) {
      props.snackBar("Phone Number is Incorrect", "error");
      return;
    }
    if (user.gender_id === "") {
      props.snackBar("Gender is not Selected", "error");
      return;
    }
    
  };
  return (
    <div
      className="position-relative"
      style={{ height: "100vh", overflowY: "scroll" }}
    >
      <div className="position-absolute go-back">
        <GoBack onClickHandler={() => history.push("/dashboard")} />
      </div>
      <div className="container">
        <div className={classes.margin}>
          <div>
            <p className="containertext-left dash-title-category">
              Edit Details
            </p>
            <div className="col p-0" style={{ marginTop: "-20px" }}>
              <div className="hr">
                <hr className="col p-0" />
              </div>
              <div className="col question-outoff p-0 mb-3">
                <span>
                  Manage your personal information , password and more
                </span>
              </div>
            </div>
          </div>
          <div className="input-container w-100 d-flex flex-column">
            <div className="d-flex mt-2 mb-2">
              <div className="col-md-6">
                <InputReducer
                  placeholder="Register Number"
                  name="Register no"
                  id="Register number1"
                  type="text"
                  label="Register Number"
                  value={user.regno}
                  disabled={true}
                  className={classes.fieldColor}
                  onClickHandler={(value) => setUser({ ...user, regno: value })}
                />
              </div>
              <div className="col-md-6">
                <InputReducer
                  placeholder="Enter Name"
                  name="Name"
                  id="Name1"
                  type="text"
                  label="Name"
                  value={user.name}
                  className={classes.fieldColor}
                  onClickHandler={(value) => setUser({ ...user, name: value })}
                />
              </div>
            </div>
            <div className="d-flex mt-2 mb-2">
              <div className="col-md-6">
                <InputReducer
                  placeholder="Enter Email"
                  name="Email"
                  id="Email1"
                  type="email"
                  label="Email"
                  value={user.email}
                  onClickHandler={(value) => setUser({ ...user, email: value })}
                  className={classes.fieldColor}
                />
              </div>
              <div className="col-md-6">
                <InputReducer
                  placeholder="Enter Phone Number"
                  name="Phone number"
                  label="Phone number"
                  id="Phone number1"
                  type="Number"
                  value={user.phone_no}
                  className={classes.fieldColor}
                  onClickHandler={(value) =>
                    setUser({ ...user, phone_no: value })
                  }
                />
              </div>
            </div>
            <div className="d-flex mt-2 mb-2">
              <div className="col-md-6">
                <SelectReducer
                  className={classes.fieldColor}
                  array={["B.E", "B.Tech"]}
                  name="Stream"
                  id="Stream1"
                  value={user.stream_id}
                  disabled={true}
                />
              </div>
              <div className="col-md-6">
                <SelectReducer
                  className={classes.fieldColor}
                  array={
                    user.stream_id === "B.Tech"
                      ? ["Information Technology"]
                      : [
                          "Computer Science & Engineering",
                          "Electrical & Electronics Engineering",
                          "Electronics and Communication Engineering",
                          "Mechanical Engineering",
                          "Automobile Engineering",
                          "Civil Engineering",
                          "Safety & Fire Engineering",
                        ]
                  }
                  name="Course Name"
                  id="Course Name1"
                  disabled={true}
                  value={user.course_id}
                />
              </div>
            </div>
            <div className="d-flex mt-2 mb-2">
              <div className="col-md-6">
                <SelectReducer
                  value={user.college_id}
                  className={classes.fieldColor}
                  array={[
                    "KSR College of Engineering",
                    "KSR College of Technology",
                    "KSR Institute for Engineering & Technology",
                  ]}
                  name="College Name"
                  id="College Name1"
                  disabled={true}
                />
              </div>
              <div className="col-md-6">
                <SelectReducer
                  className={classes.fieldColor}
                  array={[
                    "2018-2022",
                    "2019-2023",
                    "2020-2024",
                    "2021-2025",
                    "2022-2026",
                    "2023-2027",
                    "2024-2028",
                    "2025-2029",
                    "2026-2030",
                  ]}
                  name="Batch year"
                  label="Batch year"
                  id="Batch year1"
                  disabled={true}
                  value={user.batch_id}
                />
              </div>
            </div>
            <div
              className="d-flex mt-2 mb-2"
              style={{ position: "relative", left: "-7px" }}
            >
              <div className="col-md-6 ml-2">
                <SelectReducer
                  array={["male", "female", "other"]}
                  name="Select gender"
                  id="Gender"
                  value={user.gender_id}
                  handleSelect={(e) =>
                    setUser({ ...user, gender_id: e.target.value })
                  }
                  className={classes.fieldColor}
                />
              </div>
            </div>
            <div className="px-3 py-2">
              <p className="containertext-left dash-title-category">
                Edit Password
              </p>
              <div className="col p-0" style={{ marginTop: "-20px" }}>
                <div className="hr">
                  <hr className="col p-0" />
                </div>
              </div>
            </div>

            <div className="d-flex mt-2 mb-2">
              <div className="col-md-6">
                <PasswordField
                  type="New Password"
                  name="new password"
                  id="new password"
                  labelWidth={108}
                  value={user.new_password}
                  onClickHandler={(e) =>
                    setUser({ ...user, new_password: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <PasswordField
                  type="Confirm Password"
                  name="confirm password"
                  id="confirm password"
                  labelWidth={133}
                  value={user.confirm_password}
                  onClickHandler={(e) =>
                    setUser({ ...user, confirm_password: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="d-flex pl-3 mt-2">
              <CustomButton
                className="btn-hover color-11 mt-3 mr-3"
                onClickHandler={userEditedDetails}
              >
                <i className="fas fa-save pr-2 pl-2"></i> SAVE CHANGES
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
