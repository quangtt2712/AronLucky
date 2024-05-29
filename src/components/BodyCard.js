import React from "react";
import xPrizeSvg from "../assets/x-prize.svg";

const BodyCard = () => {
  return (
    <div className="section-body">
      <div class="section-body-inner">
        <ul className="slots">
          <li className="slot">
            <div class="slot-item">
            <img src={xPrizeSvg} alt="coin card" className=""></img>
            </div>
          </li>
          <li className="slot">
            <div class="slot-item">
            <img src={xPrizeSvg} alt="coin card" className=""></img>

            </div>
          </li>
          <li className="slot">
            <div class="slot-item">
            <img src={xPrizeSvg} alt="coin card" className=""></img>

            </div>
          </li>
          <li className="slot">
            <div class="slot-item">
            <img src={xPrizeSvg} alt="coin card" className=""></img>

            </div>
          </li>
          <li className="slot">
            <div class="slot-item">
            <img src={xPrizeSvg} alt="coin card" className=""></img>

            </div>
          </li>
          <li className="slot">
            <div class="slot-item">
            <img src={xPrizeSvg} alt="coin card" className=""></img>

            </div>
          </li>
          
        </ul>
      </div>
    </div>
  );
};
export default BodyCard;
