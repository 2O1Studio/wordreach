import { React, useState, useEffect } from "react";
import "./Home.scss";
import LetterBox from "../LetterBox/LetterBox";
import { DndContext } from "@dnd-kit/core";
import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";

const Home = () => {
  const [letterRecord, setLetterRecord] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [availableLetter, setAvailableLetter] = useState(null);
  const [availableLetter2, setAvailableLetter2] = useState(null);
  const draggableMarkup = <Draggable id="d1">Drag me</Draggable>;
  const draggableMarkup2 = <Draggable id="d2">Drag me2</Draggable>;

  const handleDragStart = (event) => {
    console.log(event);
  };

  const handleDragEnd = (event) => {
    console.log(event);
    let oldRecord = [...letterRecord];
    if (event.over) {
      let row = extractRowColumn(event.over.id)[0] - 1;
      let column = extractRowColumn(event.over.id)[1] - 1;
      oldRecord[column] = returnDraggableObj(event.active.id);
    }
    setLetterRecord(oldRecord);
  };

  const extractRowColumn = (letterBoxId) => {
    var regex = /[+-]?\d+(?:\.\d+)?/g;
    var match;
    let arr = [];
    while ((match = regex.exec(letterBoxId))) {
      arr.push(Number(match[0]));
    }
    return arr;
  };

  const returnDraggableObj = (draggableId) => {
    if (draggableId == "d1") {
      setAvailableLetter(true);
      return draggableMarkup;
    } else {
      setAvailableLetter2(true);
      return draggableMarkup2;
    }
  };

  return (
    <>
      {/* <div className="letterGrid">
      </div> */}
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {availableLetter === null ? draggableMarkup : null}
        {availableLetter2 === null ? draggableMarkup2 : null}

        <LetterBox id="r1c1" chosenLetter={letterRecord[0]} />
        <LetterBox id="r1c2" chosenLetter={letterRecord[1]} />
        <LetterBox id="r1c3" chosenLetter={letterRecord[2]} />
        <LetterBox id="r1c4" chosenLetter={letterRecord[3]} />
        <LetterBox id="r1c5" chosenLetter={letterRecord[4]} />
        <LetterBox id="r1c6" chosenLetter={letterRecord[5]} />
        <LetterBox id="r1c7" chosenLetter={letterRecord[6]} />
        <LetterBox id="r1c8" chosenLetter={letterRecord[7]} />
      </DndContext>
    </>
  );
};

export default Home;
