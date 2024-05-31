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

const HomePage = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [userList, setUserList] = useState([]);
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

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
  };

  const currentComponent = headerCoins[currentComponentIndex];


  return (
    <div className="home-page">
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
              <HeaderUserName />
              <BodyCard userList={userList} imgCard={currentComponent.imgCard}
                              isVisible={isVisible}
                              setIsVisible={setIsVisible}/>
              <ButtonChangeBody
                items={headerCoins.map((item) => item.text)}
                onChangeComponent={handleChangeComponent}
                setIsVisible={setIsVisible}
              />
              <ButtonRoll onClick={handleButtonClick} />
              {buttonClicked && (
                <ListUser
                  onClose={handleCloseListUser}
                  onUserListUpdate={handleUserListUpdate}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
