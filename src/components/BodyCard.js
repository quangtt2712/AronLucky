// BodyCard.js
import React, { useState } from "react";
import xPrizeSvg from "../assets/x-prize.svg";
import confetti from "canvas-confetti";
import "../App.css";

const BodyCard = ({ userList }) => {
  const [rolling, setRolling] = useState(false);
  const [slotNumbers, setSlotNumbers] = useState(Array(6).fill("0"));
  const [getFinish, setFinish] = useState(false);
  const [slotItemVisible, setSlotItemVisible] = useState(true);
  const initialArray = [...Array(10).keys()];
  const myArray = ["Thế2uang", "393939", "797979", "686868"];

  const triggerConfetti = () => {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    const fire = (particleRatio, opts) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    };

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaultsInterval = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
    };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaultsInterval,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaultsInterval,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    const colors = ["#bb0000", "#ffffff"];
    const end = Date.now() + 15 * 1000;

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const rollSlots = () => {
    if (rolling) {
      setRolling(false);
      setFinish(true);
      if (!getFinish) {
        triggerConfetti();
      }
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

    if (userList.length > 0) {
      console.log(userList);
      const randomIndex = Math.floor(Math.random() * userList.length);
      const randomElement = userList[randomIndex];
      console.log(randomElement);
      const newSlotNumbers = String(randomElement).padStart(6, "0").split("");
      setSlotNumbers(newSlotNumbers);
      userList.splice(randomIndex, 1);
    } else {
      const randomIndex = Math.floor(Math.random() * myArray.length);
      const randomElement = myArray[randomIndex];
      console.log(randomElement);
      const newSlotNumbers = String(randomElement).padStart(6, "0").split("");
      setSlotNumbers(newSlotNumbers);
    }
  };

  return (
    <div className="section-body">
      <div className="section-body-inner">
        <ul className="slots">
          {slotNumbers.map((number, index) => (
            <li key={index} className="slot" onClick={rollSlots}>
              <div
                className={`flip-card ${
                  rolling ? "slotMachineNoTransition" : ""
                }`}
              >
                <div
                  className={`flip-card-inner ${
                    slotItemVisible ? "flip-card-innerroll" : ""
                  }`}
                >
                  <div className={`slot-item ${slotItemVisible ? "" : "hide"}`}>
                    <div className="card-inner">
                      <img src={xPrizeSvg} alt="coin card" className="" />
                    </div>
                  </div>
                  <div
                    className={`slotMachineContainer ${
                      rolling ? "rolling" : ""
                    }`}
                  >
                    {rolling ? (
                      initialArray
                        .sort(() => Math.random() - 0.5)
                        .map((num, idx) => (
                          <div key={idx} className="slot-number">
                            {num}
                          </div>
                        ))
                    ) : (
                      <div className="slot-number">{number}</div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BodyCard;
