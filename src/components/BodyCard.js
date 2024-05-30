import React, { useEffect, useState } from "react";
import xPrizeSvg from "../assets/x-prize.svg";
import { useNavigate } from "react-router-dom";

import "../App.css";
import confetti from "canvas-confetti";

const BodyCard = () => {
  const numberArray = [
    "000001",
    "000002",
    "000003",
    "000004",
    "000005",
    "T2uang",
  ];
  const [rolling, setRolling] = useState(false);
  const [slotNumbers, setSlotNumbers] = useState(Array(6).fill("0"));
  const [getFinish, setFinish] = useState(false);
  const [slotItemVisible, setSlotItemVisible] = useState(true);
  const initialArray = [...Array(10).keys()];
  const [array, setArray] = useState(initialArray);

  const rollSlots = () => {
    if (rolling) {
      setRolling(false);
      setFinish(true);
      var count = 200;
      var defaults = {
        origin: { y: 0.7 },
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
      var duration = 15 * 1000;
      var animationEnd = Date.now() + duration;
      var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);
      var end = Date.now() + 15 * 1000;

      // go Buckeyes!
      var colors = ["#bb0000", "#ffffff"];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();

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
    const newRandomNumber = getRandomNumber(0, 999999);

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const randomElement = numberArray[randomNumber];
    const newSlotNumbers = String(newRandomNumber).padStart(6, "0").split("");
    setSlotNumbers(newSlotNumbers);
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
                      [...array]
                        .sort(() => Math.random() - 0.5)
                        .map((num, index) => (
                          <div key={index} className="slot-number">
                            {num}
                          </div>
                        ))
                    ) : (
                      <div key={index} className="slot-number">
                        {number}
                      </div>
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
