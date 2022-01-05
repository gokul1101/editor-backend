import React, { useEffect } from "react";
import "./Profile.css";
import InputReducer from "../../../Reducer/InputReducer";
import SelectReducer from "../../../Reducer/SelectReducer/SelectReducer";
import { Button, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { emailCheck } from "../../../../services/utils";
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
  const[user,setUser] = useState({
    email:"",
    register_number:"",
    old_password:"",
    new_password:"",
    name:"",
    phone_number:"",
    gender:""
  })
  useEffect(() => {
    props.setSideToggle(false);

  });
  const userEditedDetails = () => {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let charRegex =  /^[A-Za-z0-9 ]+$/;
    if(emailRegex.test(user.email) && user.register_number.length === 7 && user.new_password.length >= 6 && charRegex.test(user.name)){
      props.snackBar("Your details are updated , Have Fun !!!","success");

    }
   else{
     props.snackBar("invalid details Please check the fields","error");
   }
   console.log(user);
  }
  return (
    <div className="container">
      <div className={styles.margin}>
        <div>
          <p className="containertext-left dash-title-category">Edit Details</p>
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
              <InputReducer
               placeholder="Enter Email"
                name="Email"
                 type="email"
                  label="Email"
                  onClickHandler={(value) => setUser({...user,email:value})} 
                   className={styles.fieldColor}/>
            </div>
            <div className="col-md-6">
              <InputReducer
                placeholder="Register Number"
                name="Register no"
                type="text"
                label="Register Number"
                className={styles.fieldColor}
                onClickHandler={(value) => setUser({...user,register_number:value})} 
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
                onClickHandler={(value) => setUser({...user,old_password:value})} 
              />
            </div>
            <div className="col-md-6">
              <InputReducer
                placeholder="New passoword"
                name="New Password"
                label="New Password"
                type="password"
                className={styles.fieldColor}
                onClickHandler={(value) => setUser({...user,new_password:value})} 

              />
            </div>
          </div>
          <div className="d-flex mt-2 mb-2">
            <div className="col-md-6">
              <InputReducer 
              placeholder="Enter Name"
               name="Name"
                type="text"
                 label="Name"
                  className={styles.fieldColor}
                  onClickHandler={(value) => setUser({...user,name:value})}  
                  />
            </div>
            <div className="col-md-6">
              <InputReducer
                placeholder="Enter Phone Nuber"
                name="Phone number"
                label="Phone number"
                type="Number"
                className={styles.fieldColor}
                onClickHandler={(value) => setUser({...user,phone_number:value})} 
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
                handleSelect={(value) => setUser({...user,gender:value.target.value})} 
                
                className={styles.fieldColor}
              />
            </div>
            
          </div>
          
          <div className="d-flex pl-3 mt-2">
            <Button  className="mr-2 btn btn-save" onClick={userEditedDetails}>
              Save Changes
            </Button>
            <Button className="btn-cancel">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
