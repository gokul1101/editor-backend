import React, { useContext, useState } from "react";
import "./Login.css";
import Developer from "../Images/developer.svg";
import Hello from "../Images/Hello.svg";
import { AuthContext } from "../../contexts/AuthContext";
import helperService from "../../services/helperService";
import { useHistory } from "react-router";


const Login = (props) => {
  const history = useHistory()
  //** Context Consumer */
  const [authState, authDispatch] = useContext(AuthContext)
  const [change, setChange] = useState(false);
  const [register, setRegister] = useState("");
  const [password, setPassword] = useState("");
  const changeSignup = () => {
    setChange(true);
  };
  const changeSignin = () => {
    setChange(false);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await helperService.login({regno:register,password})
      if(response.success){
        const user = {role:response.role,token:response.token} 
        localStorage.setItem("user", JSON.stringify(user));
        authDispatch({type:'SET_USER',payload:user})

        props.snackBar("Logged in Succesfully..!!", "success");
      }
    }
    catch(err){
      console.log(err)
    }
  };

  // const handleAdmin = (e) => {
  //   e.preventDefault();
  //   localStorage.setItem("admin", admin);
  //   // props.setLogin(true);
  //   authDispatch({type:'SET_USER',isLogin:true})
  //   console.log(authState)
  //   props.snackBar("Logged Admin Succesfully..!!", "success");
  // };
  
  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
    handleSubmit()
    }
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
              <button
                className="btn-hover color-11"
                onKeyPress={handleKeypress}
                type = "submit"
              >
                SIGN IN <i className="fas fa-sign-in-alt mr-2 ml-2"></i>
              </button>
            </form>
            <form action="#" className="sign-up-form" onSubmit={handleSubmit}>
              <h2 className="title">Admin Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Register no"
                  onChange={(e) => setRegister(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" 
                onChange = {(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="btn-hover color-11 mt-2"
                onKeyPress={handleKeypress}
                type = "submit"
              >
                SIGN UP <i className="fas fa-sign-out-alt mr-2 ml-2"></i>
              </button>
            </form>
          </div>
        </div>

        <div className="panels-cont">
          <div className="panel left-panel">
            <div className="content">
              <h3>Are you admin ?</h3>
              <p>Click here to login with you adminstration ID to create contest for the students.
              </p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={changeSignup}
              >
                Sign up
              </button>
            </div>
            <img src={Hello} className="image img-fluid" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Are you Student ?</h3>
              <p>Click here to login as a student with the help of register number to attend contest .
              </p>
              <button
                className="btn transparent mt-2 "
                id="sign-in-btn"
                onClick={changeSignin}
              >
                Sign in
              </button>
            </div>
            <img src={Developer} className="image img-fluid" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
