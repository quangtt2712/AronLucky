import React from "react";
import xPrizeSvg from "../assets/x-prize.svg";

const HeaderCoin = () => {
  return (
    <header className="section-head">
      <div className="coin">
        <img src={xPrizeSvg} alt="coin" className=""></img>
      </div>
    </header>
  );
};
export default HeaderCoin;
