import React, { useEffect, useState, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import { ContestContext } from "../../../../contexts/ContestContext";
import helperService from "../../../../services/helperService";
import codekata from "../../../Images/codekata.svg";
import "./Codekata.css";
const Codekata = (props) => {
  const [authState] = useContext(AuthContext);
  const [contestState, contestDispatch] = useContext(ContestContext);
  const history = useHistory();
  const [code, setCode] = useState("");
  const submitCode = async (e) => {
    e.preventDefault();
    if (code.length !== 6){
      props.snackBar("Your code is wrong!! Ckeck your code", "error");
      return;
    }
    try {
      const {status, data} = await helperService.getContestWithCode(
        {code},
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 200) {
        contestDispatch({
          type: "SET_CONTEST",
          payload: { ...data.message },
        });
        history.push(`/codekata/${code}`);
      }
    } catch (err) {
      if (err.status === 401) {
        <Redirect to ="/login" />
      }
      if(err.data)
        props.snackBar(err.data.message, "error");
      
    }
  };
  useEffect(() => {
    props.setSideToggle(false);
  });
  return (
    <div className="container h-100" style={{ marginTop: "150px" }}>
      <div className="d-flex align-items-center justify-content-center">
        <div className="col-md-6 d-flex flex-column">
          <p className="header-title mt-1">
            <span className="dash-greet">Welcome</span> {authState?.user?.name}{" "}
            ..!
          </p>
          <span>Your code goes here.. 👇🏻</span>
          <div id="divOuter" className="mt-3 mb-3">
            <div id="divInner">
              <input
                id="partitioned"
                type="text"
                maxLength="6"
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex flex-column">
            <span>
              <b>* By entering the code you can attend the test.</b>
            </span>
            <button className="btn-hover color-11 mt-4" onClick={submitCode}>
              ENTER CODE <i className="fas fa-code mr-2 ml-2"></i>
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <img src={codekata} alt="codekata-img" />
        </div>
      </div>
    </div>
  );
};

export default Codekata;
