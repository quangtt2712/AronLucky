import React from "react";
import "../App.css";
import HeaderCoin from "../components/HeaderCoin";
import HeaderTitle from "../components/HeaderTitle";
import HeaderUserName from "../components/HeaderUserName";
import BodyCard from "../components/BodyCard";
import ButtonChangeBody from "../components/ButtonChangeBody";
import ButtonRoll from "../components/ButtonRoll";
import ListUser from "../components/ListUser";
const HomePage = () => {
  return (
    <div className="home-page">
      <HeaderTitle />
      <div className="main-padding">
        <div className="container-fluid">
          <div className="row">
            <div className="">
              <HeaderCoin />
              <HeaderUserName />
              <BodyCard />
              <ButtonChangeBody />
              {/* <ListUser /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
