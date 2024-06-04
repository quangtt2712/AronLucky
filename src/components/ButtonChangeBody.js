import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const ButtonChangeBody = ({ items, onChangeComponent, setIsVisible, currentComponentIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(
    currentComponentIndex != null ? currentComponentIndex : 0
);


  const handlePrev = () => {
console.log();
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    onChangeComponent(newIndex);
    setIsVisible(false);
  };

  const handleNext = () => {
    const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    onChangeComponent(newIndex);
    setIsVisible(false);
  };
  return (
    <div className="block-section-head-actions">
      <div className="section-head-actions">
        <KeyboardArrowLeftIcon className="icon-keyboard" onClick={handlePrev}/>
        {items[currentIndex]}
        <KeyboardArrowRightIcon className="icon-keyboard" onClick={handleNext}/>
      </div>
    </div>
  );
};
export default ButtonChangeBody;
