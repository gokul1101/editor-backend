import React from "react";
import "./CompilerError.css";
const CompilerError = ({ errors }) => {
  return (
    <div className="error-block bg-dark text-white p-2">
      {errors?.length > 0 ? (
        <p className="p-4 font-weight-bolder">
          {errors.map((err, index) => (
            <p key={err + index}>{err}</p>
          ))}
        </p>
      ) : (
        "Run the testcase to Compile"
      )}
    </div>
  );
};

export default CompilerError;
