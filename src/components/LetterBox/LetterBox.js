import "./LetterBox.scss";
import React from "react";
import { useDroppable } from "@dnd-kit/core";

const LetterBox = ({ row, column, id, chosenLetter }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: {
      row,
      column,
    },
  });
  const style = {
    background: isOver ? "green" : undefined,
  };
  return (
    <div ref={setNodeRef} className="letterBox" style={{ ...style }}>
      {chosenLetter}
    </div>
  );
};

export default LetterBox;
