import React, { useEffect, useState } from "react";
import xPrizeSvg from "../assets/x-prize.svg";
import "../App.css";

const BodyCard = () => {
  const numberArray = ["6868", "123456", "888888", "123123", "397968"];
  const [rolling, setRolling] = useState(false);
  const [slotNumbers, setSlotNumbers] = useState(Array(6).fill("0"));
  const [getFinish, setFinish] = useState(false);
  const [slotItemVisible, setSlotItemVisible] = useState(true);

  useEffect(() => {
    if (rolling) {
      const interval = setInterval(() => {
        setSlotNumbers(prevNumbers => {
          // Lấy số cuối cùng và tăng lên 1 (vòng quay từ 1 đến 9)
          const newNumbers = prevNumbers.map(num => (parseInt(num)) % 10);
          return newNumbers;
        });
      }, 100); // Thay đổi tốc độ cuộn số tại đây
      return () => clearInterval(interval);
    }
  }, [rolling, numberArray]);

  const rollSlots = () => {
    if (rolling) {
      setRolling(false);
      setFinish(true);
      return;
    }

    if (getFinish) {
      setRolling(false);
      setSlotItemVisible(true);
      setFinish(false);
      return;
    }
    setSlotItemVisible(!slotItemVisible);
    setRolling(true);
    const randomNumber = Math.floor(Math.random() * numberArray.length);
    const newSlotNumbers = numberArray[randomNumber].padStart(6, "0").split("");
    setSlotNumbers(newSlotNumbers);
  };

  return (
    <div className="section-body">
      <div className="section-body-inner">
        <ul className="slots">
          {slotNumbers.map((number, index) => (
            <li key={index} className="slot" onClick={rollSlots}>
              <div className={`slot-item ${slotItemVisible ? "" : "hide"}`}>
                <img src={xPrizeSvg} alt="coin card" className="" />
              </div>
              <div
                className={`slotMachineContainer ${
                  rolling ? "rolling slotMachineNoTransition" : ""
                }`}
              >
                 {[...Array(9).keys()].map((num) => (
                  <div key={num} className="slot-number">
                    {(parseInt(number) + num) % 10 }
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BodyCard;
