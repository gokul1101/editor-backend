import React from "react";

const GradientBtn = ({ children,icon }) => {
  return (
    <button className="btn-hover color-11 mt-4">
      {children} <i className={`${icon} mr-2 ml-2`}></i>
    </button>
  );
};

export default GradientBtn;
