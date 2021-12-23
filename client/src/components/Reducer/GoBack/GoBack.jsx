import React from "react";
import { useHistory } from "react-router-dom";
const GoBack = (props) => {
  let history = useHistory();
  return (
    <div
      className="back-btn mt-3 ml-4"
      onClick={props.onClickHandler}
    >
      <div className="triangle"></div>
      <div className="halfcircle"></div>
    </div>
  );
};

export default GoBack;
