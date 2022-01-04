import React, { useEffect, useState } from "react";
import "./Profile.css";
import InputReducer from "../../../Reducer/InputReducer";
import SelectReducer from "../../../Reducer/SelectReducer/SelectReducer";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
// import { emailCheck } from "../../../../services/utils";
import CustomButton from "../../../Reducer/CustomButton/CustomButton";
import GoBack from "../../../Reducer/GoBack/GoBack";
import PasswordField from "../../../Reducer/PasswordField/PasswordField";
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
  const [user, setUser] = useState({
    email: "",
    register_number: "",
    old_password: "",
    new_password: "",
    name: "",
    phone_number: "",
    gender: "",
  });
  useEffect(() => {
    props.setSideToggle(false);
  });
  const userEditedDetails = () => {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let charRegex = /^[A-Za-z0-9 ]+$/;
    if (
      emailRegex.test(user.email) &&
      user.register_number.length === 7 &&
      user.new_password.length >= 6 &&
      charRegex.test(user.name)
    ) {
      props.snackBar("Your details are updated , Have Fun !!!", "success");
    } else {
      props.snackBar("invalid details Please check the fields", "error");
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
        {/* <div className="position-absolute mx-3 my-2 go-back">
        <GoBack onClickHandler={() => history.push("/dashboard")} />
      </div> */}
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
                  type="text"
                  label="Register Number"
                  value={user.register_number}
                  className={classes.fieldColor}
                  onClickHandler={(value) =>
                    setUser({ ...user, register_number: value })
                  }
                />
              </div>
              <div className="col-md-6">
                <InputReducer
                  placeholder="Enter Name"
                  name="Name"
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
                  type="email"
                  label="Email"
                  value={user.email}
                  onClickHandler={(value) => setUser({ ...user, email: value })}
                  className={classes.fieldColor}
                />
              </div>
              <div className="col-md-6">
                <InputReducer
                  placeholder="Enter Phone Nuber"
                  name="Phone number"
                  label="Phone number"
                  type="Number"
                  value={user.phone_number}
                  className={classes.fieldColor}
                  onClickHandler={(value) =>
                    setUser({ ...user, phone_number: value })
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
                />
              </div>
              <div className="col-md-6">
                <SelectReducer
                  className={classes.fieldColor}
                  array={[
                    "Computer Science & Engineering",
                    "Information Technology",
                    "Civil Engineering",
                  ]}
                  name="Course Name"
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
                  ]}
                  name="batch year"
                  label="Batch year"
                />
              </div>
            </div>
            <div
              className="d-flex mt-2 mb-2"
              style={{ position: "relative", left: "-7px" }}
            >
              <div className="col-md-6 ml-2">
                <SelectReducer
                  array={["MALE", "FEMALE"]}
                  name="Select gender"
                  value={user.gender}
                  defaultValue={user.gender}
                  handleSelect={(value) =>
                    setUser({ ...user, gender: value.target.value })
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
                  labelWidth={108}
                  value={user.old_password}
                  onClickHandler={(e) =>
                    setUser({ ...user, old_password: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <PasswordField
                  type="Confirm Password"
                  labelWidth={133}
                  value={user.new_password}
                  onClickHandler={(e) =>
                    setUser({ ...user, new_password: e.target.value })
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
