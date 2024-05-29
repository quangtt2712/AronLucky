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
            <div className="slot-number">1</div>
          </li>
          <li className="slot">
            <div class="slot-item">
              <img src={xPrizeSvg} alt="coin card" className=""></img>
            </div>
            <div className="slot-number">2</div>
          </li>
          <li className="slot">
            <div class="slot-item">
              <img src={xPrizeSvg} alt="coin card" className=""></img>
            </div>
            <div className="slot-number">3</div>
          </li>
          <li className="slot">
            <div class="slot-item">
              <img src={xPrizeSvg} alt="coin card" className=""></img>
            </div>
            <div className="slot-number">4</div>
          </li>
          <li className="slot">
            <div class="slot-item">
              <img src={xPrizeSvg} alt="coin card" className=""></img>
            </div>
            <div className="slot-number">5</div>
          </li>
          <li className="slot">
            <div class="slot-item">
              <img src={xPrizeSvg} alt="coin card" className=""></img>
            </div>
            <div className="slot-number">6</div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default BodyCard;
