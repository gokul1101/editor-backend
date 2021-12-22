import React, { useEffect } from "react";
import "./Loader.css";
const Loader = () => {
  useEffect(() => {
    const handler = (e) => {
      e.stopPropagation();
      e.preventDefault();
    };
    window.addEventListener("click", handler, true);
    return () => {
      window.removeEventListener('click',handler,true)
    }
  }, []);
  return (
    <div className="loader-main">
      <svg
        width="300px"
        height="200px"
        viewBox="0 0 187.3 93.7"
        preserveAspectRatio="xMidYMid meet"
        style={{
          left: "50%",
          top: "50%",
          position: "absolute",
          transform: "translate(-50%, -50%) matrix(1, 0, 0, 1, 0, 0)",
        }}
      >
        <path
          stroke="#1db954"
          id="outline"
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
        />
        <path
          id="outline-bg"
          opacity="0.08"
          fill="none"
          stroke="#000000"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
        />
      </svg>
    </div>
  );
};

export default Loader;
