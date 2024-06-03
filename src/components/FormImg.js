import React from "react";

const FormImg = ({ onUpdateImg, onClose, onDelete }) => {
  const handleUploadImage = (e) => {
    onUpdateImg(e);
  };
  const handleOverlayClick = () => {
    onClose();
  };

  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  const deleteUploadImage = () => {
    onDelete();
  }

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="form-container" onClick={handleFormClick}>
        <div className="modal-title">Chọn hình nền</div>
        <div className="upload-container form-img">
          <input
            type="file"
            id="upload"
            accept="image/*"
            onChange={handleUploadImage}
          />
          <label htmlFor="upload" className="upload-button">
            Chọn ảnh
          </label>
          <div onClick={deleteUploadImage} className="upload-button">
            Xóa hình nền
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormImg;
