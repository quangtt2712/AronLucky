import React from "react";
import "../App.css";

const ListUser = () => {
  return (
    <div className="overlay">
      <div className="form-container">
        <div className="modal-title">
        Danh sách mã quay thưởng
        </div>
        <form className="ng-pristine">
          <textarea className="textarea" placeholder="Anh/ chị Copy danh sách Mã số quay thưởng vào đây. Mỗi số thì xuống dòng giúp em ạ (Tối đa từ 0 - 999.999). Nhấn ra ngoài để thoát.">
          </textarea>
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
