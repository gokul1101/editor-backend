import React, { useEffect, useState } from "react";
import codekata from "../../../Images/codekata.svg";
import "./Codekata.css";
import { useHistory } from "react-router-dom";
const Codekata = (props) => {
  const history = useHistory();
  const [code, setCode] = useState("");
  const submitCode = (e) => {
    e.preventDefault();
    if (code.length < 6)
      props.snackBar("Your code is wrong!! Ckeck your code", "error");
    else history.push(`/codekata/${code}`);
  };
  useEffect(() => {
    props.setSideToggle(false);
  });
  return (
    <div className="container h-100" style={{ marginTop: "150px" }}>
      <div className="d-flex align-items-center justify-content-center">
        <div className="col-md-6 d-flex flex-column">
          <p className="header-title mt-1">
            <span className="dash-greet">Welcome</span> GOKUL S ..!
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
