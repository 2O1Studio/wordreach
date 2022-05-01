import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import "./Draggable.scss";

export function Draggable(props) {
  console.log(props);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: props.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    touchAction: "none",
  };

  return (
    <button
      ref={setNodeRef}
      className={`draggable ${isDragging ? "draggableIsDragging" : ""}`}
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </button>
  );
}
