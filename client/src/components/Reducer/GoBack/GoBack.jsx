import React from "react";
import { useHistory } from "react-router-dom";
const GoBack = () => {
  let history = useHistory();
  return (
    <div className="back-btn mt-3 ml-4" onClick={() => history.goBack()}>
      <div className="triangle"></div>
      <div className="halfcircle"></div>
    </div>
  );
};

export default GoBack;
