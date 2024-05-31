// ListUser.js
import React, { useEffect, useState } from "react";
import "../App.css";

const ListUser = ({ onClose, onUserListUpdate }) => {
  const [userList, setUserList] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("userList");
    if (storedData) {
      setUserList(storedData);
    }
  }, []);


  const handleOverlayClick = () => {
    onClose();
  };

  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const textareaValue = e.target.elements.userList.value;
    const userListArray = textareaValue.split("\n").filter(num => num.trim() !== "").map(num => num.trim());
    setUserList(textareaValue);
    onUserListUpdate(userListArray);
    onClose();
  };

  const countItems = () => {
    const lines = userList.split("\n");
    const nonEmptyLines = lines.filter(line => line.trim() !== "");
    return nonEmptyLines.length;
  };

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="form-container" onClick={handleFormClick}>
        <div className="modal-title">Danh sách mã quay thưởng</div>
        <form className="ng-pristine" onSubmit={handleSubmit}>
          <textarea
            className="textarea"
            name="userList"
            value={userList}
            onChange={(e) => setUserList(e.target.value)}
            placeholder="Anh/ chị Copy danh sách Mã số quay thưởng vào đây. Mỗi số thì xuống dòng giúp em ạ (Tối đa từ 0 - 999.999).Nhấn ra ngoài để thoát."
          ></textarea>
          <div className="number-user">Số lượng: {countItems()}</div>
          <button type="submit" className="btn-yellow-alt">Lưu Lại</button>
        </form>
      </div>
    </div>
  );
};

export default ListUser;
