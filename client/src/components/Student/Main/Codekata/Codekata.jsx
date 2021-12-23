import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import helperService from "../../../../services/helperService";
import codekata from "../../../Images/codekata.svg";
import CustomButton from "../../../Reducer/CustomButton/CustomButton";
import "./Codekata.css";
import { useLoader } from "../../../../contexts/AuthContext";
const Codekata = ({ setSideToggle, ...props }) => {
  const [authState, authDispatch] = useContext(AuthContext);
  const history = useHistory();
  const [code, setCode] = useState("");
  const [loader, showLoader, hideLoader] = useLoader();
  useEffect(() => {
    setSideToggle(false);
    authDispatch({ type: "REMOVE_CONTEST" });
  }, [setSideToggle, authDispatch]);
  const submitCode = async (e) => {
    e.preventDefault();
    if (code.length !== 6) {
      props.snackBar("Your code is wrong!! Ckeck your code", "error");
      return;
    }
    try {
      showLoader();
      const {
        status,
        data: { contest },
      } = await helperService.getContestWithCode(
        { code },
        { headers: { Authorization: authState.user.token } }
      );
      if (status === 200) {
        authDispatch({
          type: "SET_CONTEST",
          payload: { ...contest },
        });
        authDispatch({
          type: "SET_DURATION",
          payload: contest?.session?.ends_at,
        });
        hideLoader();
        history.push(`/codekata/${code}`);
      }
    } catch (err) {
      console.log(err);
      hideLoader();
    }
  };
  return (
    <div className="container h-100" style={{ marginTop: "150px" }}>
      {loader}
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
                value={code.toUpperCase()}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex flex-column">
            <span>
              <b>* By entering the code you can attend the test.</b>
            </span>
            <CustomButton
              className="btn-hover color-11 mt-3"
              onClickHandler={submitCode}
            >
              <i className="fas fa-code pr-2 pl-2"></i>ENTER CODE
            </CustomButton>
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
