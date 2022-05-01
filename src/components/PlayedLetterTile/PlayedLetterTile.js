import React from "react";

export function PlayedLetterTile(props) {
  return (
    <button className={`draggable draggablePlayed`}>{props.children}</button>
  );
}
