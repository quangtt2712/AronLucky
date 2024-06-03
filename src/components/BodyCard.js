// BodyCard.js
import React, { useEffect, useState } from "react";
import xPrizeSvg from "../assets/x-prize.svg";
import confetti from "canvas-confetti";
import "../App.css";

const BodyCard = ({ userList, imgCard, isVisible, setIsVisible }) => {
  const [rolling, setRolling] = useState(false);
  const [slotNumbers, setSlotNumbers] = useState(Array(6).fill("0"));
  const [getFinish, setFinish] = useState(false);
  const [slotItemVisible, setSlotItemVisible] = useState(true);
  const initialArray = [...Array(10).keys()];
  const myArray = ["Aron68", "393939", "797979", "686868"];


  useEffect(() => {
    setTimeout(() => {
      console.log(getFinish);
     setIsVisible(true); 
     setFinish(true);
     finishRoll();
    }, 200); 
 }, [imgCard]); 

 const finishRoll = () => {
  setRolling(false);
  setSlotItemVisible(true);
  setFinish(false);
  return;
 }


  const triggerConfetti = () => {
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

    // ////////////////////////////////////////
    var duration = 8 * 1000;
var animationEnd = Date.now() + duration;
var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

var interval = setInterval(function() {
  var timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  var particleCount = 50 * (timeLeft / duration);
  // since particles fall down, start a bit higher than random
  confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
  confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
}, 250);
///////////////////////////////
var end = Date.now() + (8 * 1000);

// go Buckeyes!
var colors = ['#bb0000', '#FFFF00'];

(function frame() {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors
  });
  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
}());
  };

  const rollSlots = () => {
    if (rolling) {
      setRolling(false);
      setFinish(true);
      triggerConfetti();
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
    
    <div className={`section-body ${isVisible ? "visible" : ""}`}>
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
                      <img src={imgCard} alt="coin card" className="" />
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
