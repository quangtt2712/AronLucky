import React, { useEffect, useState } from "react";
import "../App.css";

const ListUser = ({ onClose }) => {
  const [userList, setUserList] = useState(""); // State để lưu trữ danh sách mã số quay thưởng

  const handleOverlayClick = () => {
    onClose(); // Gọi hàm onClose để đóng component ListUser
  };

  const handleFormClick = (e) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click từ lan tỏa ra ngoài
  };


  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn việc refresh trang khi submit form
    // Lấy giá trị từ trường textarea
    const textareaValue = e.target.elements.userList.value;
    setUserList(textareaValue);
    localStorage.setItem("userList", textareaValue); 
    window.location.reload() 
};
  

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="form-container" onClick={handleFormClick}>
        <div className="modal-title">Danh sách mã quay thưởng</div>
        <form className="ng-pristine" onSubmit={handleSubmit}>
          <textarea
            className="textarea"
            name="userList"
            placeholder="Anh/ chị Copy danh sách Mã số quay thưởng vào đây. Mỗi số thì xuống dòng giúp em ạ (Tối đa từ 0 - 999.999). Nhấn ra ngoài để thoát."
          ></textarea>
          <div className="number-user">Số lượng: 999999</div>

          <button type="submit" className="btn-yellow-alt">
            Lưu Lại
          </button>
        </form>
      </div>
    </div>
  );
};
export default ListUser;
