import React from "react";

const CustomButton = ({
  children,
  className,
  id,
  onClickHandler,
  onKeyPressHandler,
}) => {
  return (
    <button
      className={`${className} pr-4 pl-3`}
      id={id}
      onClick={onClickHandler}
      onKeyPress={onKeyPressHandler}
    >
      {children}
    </button>
  );
};

export default CustomButton;
