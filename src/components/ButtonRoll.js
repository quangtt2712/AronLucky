import React from "react";

const ButtonRoll = ({onClick}) => {
  const handleClick = () => {
    onClick(); 
  };
  return (
    <div className="section-button">
      <div className="btn" onClick={handleClick}>danh sách Mã số</div>
    </div>
  );
};
export default ButtonRoll;
