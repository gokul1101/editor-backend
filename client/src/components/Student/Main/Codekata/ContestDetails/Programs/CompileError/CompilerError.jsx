import React, { useEffect, useState } from "react";
import "./CompilerError.css";
const CompilerError = () => {
  const [error, setError] = useState("");
  useEffect(() => {
    setError("MyClass.java:4: error: ';' expected");
  }, []);
  return (
    <div className="error-block">
      <p className="p-4 font-weight-bolder">{error}</p>
    </div>
  );
};

export default CompilerError;
