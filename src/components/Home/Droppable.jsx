import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    background: isOver ? "green" : undefined,
    height: 200,
    border: "1px solid #000",
    margin: 40,
  };

  console.log(props);

  return (
    <div ref={setNodeRef} style={{ ...style }}>
      {props.children}
    </div>
  );
}
