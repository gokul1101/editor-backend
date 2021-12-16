import React, { useEffect } from "react";
import "./Profile.css";
import InputReducer from "../../../Reducer/InputReducer";
import SelectReducer from "../../../Reducer/SelectReducer/SelectReducer";
import { Button, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #1E2D64",
  },
  margin:{
      marginTop:"200px"
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
  const styles = useStyles()
  useEffect(() => {
    props.setSideToggle(false);
  });
  return (
    <div className={styles.margin}>
      <div>
        <p className="text-left dash-title-category">Edit Details</p>
        <div className="col p-0" style={{ marginTop: "-20px" }}>
          <div className="hr">
            <hr className="col p-0" />
          </div>
          <div className="col question-outoff p-0 mb-3">
            <span>Manage your personal information , password and more</span>
          </div>
        </div>
      </div>
      <div className="input-container w-100 d-flex flex-column">
        <div className="d-flex mt-2 mb-2">
          <div className="col-md-6">
            <InputReducer placeholder="Enter Email" name="Email" type="email" label="Email"  className={styles.fieldColor}/>
          </div>
          <div className="col-md-6">
            <InputReducer
              placeholder="Register Number"
              name="Register no"
              type="text"
              label="Register Number"
              className={styles.fieldColor}
            />
          </div>
        </div>
        <div className="d-flex mt-2 mb-2">
          <div className="col-md-6">
            <InputReducer
              placeholder="Old passoword"
              name="Old Password"
              type="password"
              label="Old Password"
              className={styles.fieldColor}
            />
          </div>
          <div className="col-md-6">
            <InputReducer
              placeholder="New passoword"
              name="New Password"
              label="New Password"
              type="password"
              className={styles.fieldColor}
            />
          </div>
        </div>
        <div className="d-flex mt-2 mb-2">
          <div className="col-md-6">
            <InputReducer placeholder="Enter Name" name="Name" type="text" label="Name" className={styles.fieldColor} />
          </div>
          <div className="col-md-6">
            <InputReducer
              placeholder="Enter Phone Nuber"
              name="Phone number"
              label="Phone number"
              type="Number"
              className={styles.fieldColor}
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
            
              className={styles.fieldColor}
            />
          </div>
          
        </div>
        {/* <div
          className="d-flex mt-3 mb-2"
          style={{ position: "relative", left: "-7px" }}
        >
          <div className="col-md-6">
            <SelectReducer array={["CSE", "IT", "CIVIL"]} className="w-100" name="Course name" />
          </div>
        </div> */}
        <div className="d-flex pl-3 mt-2">
          <Button   className="mr-2 btn btn-save">
            Save Changes
          </Button>
          <Button className="btn-cancel">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
