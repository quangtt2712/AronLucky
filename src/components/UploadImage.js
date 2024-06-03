import React from "react";
import "../App.css"; // Import file CSS

const UploadImage = ({ onChangeImg }) => {
  const handleUploadImage = () => {
    onChangeImg();
  };

  return (

    <div className="upload-container">
      <div htmlFor="upload" className="upload-button" onClick={handleUploadImage}>
        Chọn ảnh
      </div>
    </div>
  );
};

export default UploadImage;
