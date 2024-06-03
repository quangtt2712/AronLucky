import React from "react";

const PresentBody = ({ onClick }) => {
  const handleClick = () => {
    onClick();
  };
  return (
    <div className="upload-container">
      <div className="upload-button" onClick={handleClick}>
        Trình chiếu
      </div>
    </div>
  );
};

export default PresentBody;
