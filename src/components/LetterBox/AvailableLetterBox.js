import "./LetterBox.scss";
import React from "react";
import { useDrag } from "react-dnd";

const AvailableLetterBox = ({ displayLetter, colour, availableBoxId }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "letterBox",
    item: { availableBoxId },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;

  return (
    <div
      className={`letterBox ${colour ? colour : ""}`}
      ref={drag}
      role="LetterBox"
      style={{ opacity }}
      data-testid={`letterBox-${availableBoxId}`}
    >
      {displayLetter}
    </div>
  );
};

export default AvailableLetterBox;
