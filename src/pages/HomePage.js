import React, { useState, useEffect } from "react";
import "../App.css";
import HeaderCoin from "../components/HeaderCoin";
import HeaderTitle from "../components/HeaderTitle";
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
import Background from "../assets/background.jpg";
import { setImage, getImage, deleteImage } from '../db';

const HomePage = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [userList, setUserList] = useState([]);
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [buttonClickedImg, setButtonClickedImg] = useState(false);
  const [overlayComponentIndex, setOverlayComponentIndex] = useState(null);
  const [updateButtonChangeBody, setUpdateButtonChangeBody] = useState(false);

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
    const fetchBackgroundImage = async () => {
      const storedBackgroundImage = await getImage('backgroundImage');
      if (storedBackgroundImage) {
        setBackgroundImage(storedBackgroundImage);
      } else {
        setBackgroundImage(Background);
      }
    };
    fetchBackgroundImage();
  }, []);

  const handleButtonClickImg = () => {
    setButtonClickedImg(true);
  };

  const handleCloseFormImg = () => {
    setButtonClickedImg(false);
  };

  const handleDeteleImg = async () => {
    await deleteImage('backgroundImage');
    setBackgroundImage(Background);
  };

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      await setImage('backgroundImage', reader.result);
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
    setOverlayComponentIndex(index);
    setUpdateButtonChangeBody(!updateButtonChangeBody);
  };

  const currentComponent = headerCoins[currentComponentIndex];
  const handlePresentBodyClick = () => {
    setShowOverlay(true);
  };

  const handleOverlayClose = () => {
    setShowOverlay(false);
    setUpdateButtonChangeBody(!updateButtonChangeBody);
  };

  return (
    <div className="home-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
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
              <BodyCard
                userList={userList}
                imgCard={currentComponent.imgCard}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
              />
              <ButtonChangeBody
                key={`main-${currentComponentIndex}`}
                items={headerCoins.map((item) => item.text)}
                onChangeComponent={handleChangeComponent}
                setIsVisible={setIsVisible}
                currentComponentIndex={overlayComponentIndex}
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
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
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
              <BodyCard
                userList={userList}
                imgCard={currentComponent.imgCard}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
              />
              <ButtonChangeBody
                key={`overlay-${currentComponentIndex}`}
                items={headerCoins.map((item) => item.text)}
                onChangeComponent={handleChangeComponent}
                setIsVisible={setIsVisible}
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
