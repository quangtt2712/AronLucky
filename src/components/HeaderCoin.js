import React, { useEffect, useState } from "react";

const HeaderCoin = ({ imgCard, isVisible,setIsVisible }) => {


  useEffect(() => {
     setTimeout(() => {
      setIsVisible(true); 
     }, 200); 
  }, [imgCard]); 

  return (
      <header className="section-head">
      <div className={`coin`}>
        <img src={imgCard} alt="coin" className={`imgCard ${isVisible ? "visible" : ""}`}></img>
      </div>
    </header>
    
  )
};

export default HeaderCoin;
