import "./LetterBox.scss";
import React from "react";
import { useDrop } from "react-dnd";

const LetterBox = ({ displayLetter, colour, boxId }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "letterBox",
    drop: () => ({ name: boxId }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      className={`letterBox ${colour ? colour : ""}`}
      ref={drop}
      role={"LetterBox"}
    >
      {displayLetter}
    </div>
  );
};

export default LetterBox;
