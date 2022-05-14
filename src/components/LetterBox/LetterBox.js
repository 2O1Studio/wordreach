import "./LetterBox.scss";
import React, { useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";
import clsx from "clsx";

const LetterBox = ({
  row,
  column,
  id,
  chosenLetter,
  onClick,
  activeTile,
  playableLetters,
}) => {
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

  const hoverLetter = useMemo(
    () => playableLetters.find((l) => l.id === activeTile)?.letter,
    [playableLetters, activeTile]
  );
  return (
    <div
      ref={setNodeRef}
      className={clsx({
        letterBox: true,
        letterBoxWithHover: !!activeTile,
      })}
      style={{ ...style }}
      onClick={handleClick}
    >
      <div className="letterBoxActiveLetter">
        {activeTile ? hoverLetter : null}
      </div>
      {chosenLetter}
    </div>
  );
};

export default LetterBox;
