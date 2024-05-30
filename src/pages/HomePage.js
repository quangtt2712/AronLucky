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

const HomePage = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("userList");
    if (storedData) {
      const numbers = storedData.split("\n").filter(num => num.trim() !== "").map(num => num.trim());
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

  return (
    <div className="home-page">
      <HeaderTitle />
      <div className="main-padding">
        <div className="container-fluid">
          <div className="row">
            <div>
              <HeaderCoin />
              <HeaderUserName />
              <BodyCard userList={userList} />
              <ButtonChangeBody />
              <ButtonRoll onClick={handleButtonClick} />
              {buttonClicked && <ListUser onClose={handleCloseListUser} onUserListUpdate={handleUserListUpdate} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
