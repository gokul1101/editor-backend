import React, { useEffect, useState } from "react";
import "./CompilerError.css";
const CompilerError = ({errors}) => {
  return (
    <div className="error-block h-100 w-100 bg-dark text-white">
      <p className="p-4 font-weight-bolder">{errors}</p>
    </div>
  );
};

export default CompilerError;
