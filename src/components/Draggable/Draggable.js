import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import "./Draggable.scss";
import clsx from "clsx";

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: props.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    touchAction: "none",
    ...(props.disablePointerEvent ? { pointerEvents: "none" } : {}),
  };

  return (
    <button
      ref={setNodeRef}
      className={clsx({
        draggableIsDragging: isDragging,
        draggable: true,
        draggableIsActive: props.isActive,
      })}
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </button>
  );
}
