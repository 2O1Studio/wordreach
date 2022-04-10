import "./LetterBox.scss";
import React from "react";

const LetterBox = ({ displayLetter, colour }) => {
  return (
    <div className={`letterBox ${colour ? colour : ""}`}>{displayLetter}</div>
  );
};

export default LetterBox;
