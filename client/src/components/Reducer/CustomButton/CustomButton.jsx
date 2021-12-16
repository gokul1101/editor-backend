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
      className={className}
      id={id}
      onClick={onClickHandler}
      onKeyPress={onKeyPressHandler}
    >
      {children}
    </button>
  );
};

export default CustomButton;
