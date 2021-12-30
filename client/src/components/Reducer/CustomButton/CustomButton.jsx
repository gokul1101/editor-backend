import React from "react";

const CustomButton = ({
  children,
  className,
  id,
  onClickHandler,
  onKeyPressHandler,
  disabled
}) => {
  return (
    <button
      disabled = {disabled}
      className={`${className} pr-4 pl-3`}
      id={id}
      onClick={onClickHandler}
      onKeyPress={onKeyPressHandler}
      disabled = {disabled}
    >
      {children}
    </button>
  );
};

export default CustomButton;
