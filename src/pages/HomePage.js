import React from "react";
import "../App.css";
import HeaderCoin from "../components/HeaderCoin";
import HeaderTitle from "../components/HeaderTitle";
import HeaderUserName from "../components/HeaderUserName";
import BodyCard from "../components/BodyCard";
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
