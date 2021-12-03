import React, { useState } from "react";
import "./Login.css";
import Developer from "../Images/developer.svg";
import Hello from "../Images/Hello.svg";
import CustomButton from "../Reducer/CustomButton/CustomButton";
const Login = (props) => {
  const [change, setChange] = useState(false);
  const [register, setRegister] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState("");
  const changeSignup = () => {
    setChange(true);
  };
  const changeSignin = () => {
    setChange(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("reg", register);
    localStorage.setItem("role", "student");
    props.setLogin(true);
    props.snackBar("Logged in Succesfully..!!", "success");
  };

  const handleAdmin = (e) => {
    e.preventDefault();
    localStorage.setItem("admin", admin);
    props.setLogin(true);
    props.snackBar("Logged Admin Succesfully..!!", "success");
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      if (change) {
        handleAdmin();
      }
    } else handleSubmit();
  };

  return (
    <div>
      <div className={change ? "clip-content sign-up-mode" : "clip-content"}>
        <div className="forms-cont">
          <div className="signin-signup">
            <form className="sign-in-form" onSubmit={handleSubmit}>
              <h2 className="title form-title">Student Sign in</h2>
              <p className="text-muted">Learn , code , repeat</p>

              <div className="input-field mb-2">
                <i className="fas fa-lock"></i>
                <input
                  type="text"
                  placeholder="Register number"
                  onChange={(e) => setRegister(e.target.value)}
                />
              </div>
              <div className="input-field mb-4">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  // onKeyPress={handleKeypress}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <CustomButton
                className="btn-hover color-11"
                onKeyPress={handleKeypress}
                onClick={handleSubmit}
              >
                SIGN IN <i className="fas fa-sign-in-alt mr-2 ml-2"></i>
              </CustomButton>
            </form>
            <form action="#" className="sign-up-form" onSubmit={handleAdmin}>
              <h2 className="title">Admin Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Register no"
                  onChange={(e) => setAdmin(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </div>
              <CustomButton
                className="btn-hover color-11 mt-2"
                onKeyPress={handleKeypress}
                onClick={handleAdmin}
              >
                SIGN UP <i className="fas fa-sign-out-alt mr-2 ml-2"></i>
              </CustomButton>
            </form>
          </div>
        </div>

        <div className="panels-cont">
          <div className="panel left-panel">
            <div className="content">
              <h3>Are you admin ?</h3>
              <p>
                Click here to login with you adminstration ID to create contest
                for the students.
              </p>
              <CustomButton
                className="btn transparent"
                id="sign-up-btn"
                onClickHandler={changeSignup}
              >
                Sign in
              </CustomButton>
            </div>
            <img src={Hello} className="image img-fluid" alt="admin-signin" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Are you Student ?</h3>
              <p>
                Click here to login as a student with the help of register
                number to attend contest .
              </p>
              <CustomButton
                className="btn transparent mt-2 "
                id="sign-in-btn"
                onClickHandler={changeSignin}
              >
                Sign in
              </CustomButton>
            </div>
            <img
              src={Developer}
              className="image img-fluid"
              alt="student-signin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
