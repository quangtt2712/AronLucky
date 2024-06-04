// HomePage.js
import React, { useState, useEffect } from "react";
import "../App.css";
import HeaderCoin from "../components/HeaderCoin";
import HeaderTitle from "../components/HeaderTitle";
import HeaderUserName from "../components/HeaderUserName";
import BodyCard from "../components/BodyCard";
import ButtonChangeBody from "../components/ButtonChangeBody";
import ButtonRoll from "../components/ButtonRoll";
import ListUser from "../components/ListUser";
import bronzePrizeSvg from "../assets/bronze-prize.svg";
import silverPrizeSvg from "../assets/silver-prize.svg";
import goldPrizeSvg from "../assets/gold-prize.svg";
import diamondPrizeSvg from "../assets/diamond-prize.svg";
import xPrizeSvg from "../assets/x-prize.svg";
import UploadImage from "../components/UploadImage";
import PresentBody from "../components/PresentBody";
import ClearIcon from "@mui/icons-material/Clear";
import FormImg from "../components/FormImg";
import { Form } from "react-router-dom";
import Background from "../assets/background.jpg";
import { v4 as uuidv4 } from 'uuid';

const HomePage = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [userList, setUserList] = useState([]);
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(<Background />);
  const [showOverlay, setShowOverlay] = useState(false); // Thêm trạng thái này
  const [buttonClickedImg, setButtonClickedImg] = useState(false);
  const [overlayComponentIndex, setOverlayComponentIndex] = useState(null); // State mới cho overlay
  const [updateButtonChangeBody, setUpdateButtonChangeBody] = useState(false); // State to trigger re-render


  const headerCoins = [
    {
      imgCard: bronzePrizeSvg,
      text: "giải ba",
    },
    {
      imgCard: silverPrizeSvg,
      text: "giải nhì",
    },
    {
      imgCard: goldPrizeSvg,
      text: "giải nhất",
    },
    {
      imgCard: diamondPrizeSvg,
      text: "giải đặc biệt",
    },
    {
      imgCard: xPrizeSvg,
      text: "giải x",
    },
  ];
  useEffect(() => {
    const storedBackgroundImage = localStorage.getItem("backgroundImage");

    if (storedBackgroundImage && storedBackgroundImage !== backgroundImage) {
      setBackgroundImage(storedBackgroundImage);
    } else if (!storedBackgroundImage) {
      setBackgroundImage(Background);
    }
  }, [backgroundImage]);
  const handleButtonClickImg = () => {
    setButtonClickedImg(true);
  };
  const handleCloseFormImg = () => {
    setButtonClickedImg(false);
  };
  const handleDeteleImg = () => {
    localStorage.removeItem("backgroundImage"); 
    setBackgroundImage(<Background />);
  }
  // Hàm xử lý sự kiện khi người dùng tải lên hình ảnh mới
  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (file.size > 4 * 1024 * 1024) {
      // 5MB = 5 * 1024 * 1024 bytes
      alert("Ảnh chỉ tối đa 4mb dùm em.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      // Lưu trữ hình ảnh vào localStorage
      localStorage.setItem("backgroundImage", reader.result);
      setBackgroundImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("userList");
    if (storedData) {
      const numbers = storedData
        .split("\n")
        .filter((num) => num.trim() !== "")
        .map((num) => num.trim());
      setUserList(numbers);
    }
  }, []);

  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  const handleCloseListUser = () => {
    setButtonClicked(false);
  };

  const handleUserListUpdate = (newList) => {
    setUserList(newList);
    localStorage.setItem("userList", newList.join("\n"));
  };

  const handleChangeComponent = (index) => {
    setCurrentComponentIndex(index);
    setOverlayComponentIndex(index); // Cập nhật index cho overlay khi thay đổi
    setUpdateButtonChangeBody(!updateButtonChangeBody); // Trigger re-render
  };

  const currentComponent = headerCoins[currentComponentIndex];
  const handlePresentBodyClick = () => {
    setShowOverlay(true);
  };

  const handleOverlayClose = () => {
    setShowOverlay(false);
    setUpdateButtonChangeBody(!updateButtonChangeBody); // Trigger re-render

  };

  return (
    <div
      className="home-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <HeaderTitle />
      <div className="main-padding">
        <div className="container-fluid">
          <div className="row">
            <div>
              <HeaderCoin
                imgCard={currentComponent.imgCard}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
              />
              {/* <HeaderUserName /> */}
              <BodyCard
                userList={userList}
                imgCard={currentComponent.imgCard}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
              />
              <ButtonChangeBody
                items={headerCoins.map((item) => item.text)}
                onChangeComponent={handleChangeComponent}
                setIsVisible={setIsVisible}
                currentIndex={overlayComponentIndex} 
              />
              {buttonClicked && (
                <ListUser
                  onClose={handleCloseListUser}
                  onUserListUpdate={handleUserListUpdate}
                />
              )}

              <div className="collection-btn">
                <UploadImage onChangeImg={handleButtonClickImg} />
                <ButtonRoll onClick={handleButtonClick} />
                <PresentBody onClick={handlePresentBodyClick} />
              </div>
              {buttonClickedImg && (
                <FormImg
                  onUpdateImg={handleUploadImage}
                  onClose={handleCloseFormImg}
                  onDelete={handleDeteleImg}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {showOverlay && (
        <div
          className="home-page"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            position: "absolute", // Đảm bảo phần tử background sử dụng vị trí tuyệt đối
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1, // Thiết lập giá trị z-index thấp hơn overlay để background hiển thị phía trên cùng
          }}
        >
          <div className="overlay-present">
            <div className="overlay-content">
            <HeaderTitle />

              <ClearIcon
                onClick={handleOverlayClose}
                style={{ color: "#fff", cursor: "pointer" }}
              >
                Close
              </ClearIcon>
              <HeaderCoin
                imgCard={currentComponent.imgCard}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
              />
              {/* <HeaderUserName /> */}
              <BodyCard
                userList={userList}
                imgCard={currentComponent.imgCard}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
              />
              <ButtonChangeBody
                items={headerCoins.map((item) => item.text)}
                onChangeComponent={handleChangeComponent}
                setIsVisible={setIsVisible}
                currentIndex={overlayComponentIndex}
                currentComponentIndex={overlayComponentIndex} 
              />
            </div>

            
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
