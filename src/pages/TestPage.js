import React, { useEffect, useState } from 'react';

const SlotMachine = () => {
  const [indexes, setIndexes] = useState([0, 0, 0]);
  const iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon"];
  const num_icons = 9;
  const time_per_icon = 100;

  useEffect(() => {
    const roll = async (reel, offset = 0) => {
      const delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons);
      return new Promise((resolve, reject) => {
        const style = window.getComputedStyle(reel);
        const backgroundPositionY = parseFloat(style.getPropertyValue("background-position-y"));
        const targetBackgroundPositionY = backgroundPositionY + delta * 79;
        const normTargetBackgroundPositionY = targetBackgroundPositionY % (num_icons * 79);

        setTimeout(() => {
          reel.style.transition = `background-position-y ${(8 + 1 * delta) * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
          reel.style.backgroundPositionY = `${backgroundPositionY + delta * 79}px`;
        }, offset * 150);

        setTimeout(() => {
          reel.style.transition = `none`;
          reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
          resolve(delta % num_icons);
        }, (8 + 1 * delta) * time_per_icon + offset * 150);
      });
    };

    const rollAll = () => {
      const reelsList = document.querySelectorAll('.slots > .reel');

      Promise.all([...reelsList].map((reel, i) => roll(reel, i)))
        .then((deltas) => {
          const newIndexes = indexes.map((val, i) => (val + deltas[i]) % num_icons);
          setIndexes(newIndexes);

          if (newIndexes[0] === newIndexes[1] || newIndexes[1] === newIndexes[2]) {
            const winCls = newIndexes[0] === newIndexes[2] ? "win2" : "win1";
            document.querySelector(".slots").classList.add(winCls);
            setTimeout(() => document.querySelector(".slots").classList.remove(winCls), 2000);
          }

          setTimeout(rollAll, 3000);
        });
    };

    setTimeout(rollAll, 1000);

    return () => {
      clearTimeout(rollAll);
    };
  }, [indexes]);

  return (
    <div className="slots">
      {[0, 1, 2].map((index) => (
        <div className="reel" key={index}></div>
      ))}
    </div>
  );
};

export default SlotMachine;
