import "./LetterBox.scss";
import React from "react";
import { useDroppable } from "@dnd-kit/core";

const LetterBox = ({ row, column, id, chosenLetter, onClick }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: {
      row,
      column,
    },
  });
  const style = {
    background: isOver ? "grey" : undefined,
  };

  const handleClick = () => onClick({ row, column, id });

  return (
    <div
      ref={setNodeRef}
      className="letterBox"
      style={{ ...style }}
      onClick={handleClick}
    >
      {chosenLetter}
    </div>
  );
};

export default LetterBox;
