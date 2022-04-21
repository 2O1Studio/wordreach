import { React, useState, useEffect } from "react";
import "./Home.scss";
import LetterBox from "../LetterBox/LetterBox";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "../Draggable/Draggable";

const Home = () => {
  const [letterRecord, setLetterRecord] = useState([
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
  ]);
  const [availableLetter, setAvailableLetter] = useState(null);
  const [availableLetter2, setAvailableLetter2] = useState(null);
  const draggableMarkup = <Draggable id="d1">A</Draggable>;
  const draggableMarkup2 = <Draggable id="d2">B</Draggable>;

  const handleDragStart = (event) => {
    console.log(event);
  };

  const handleDragEnd = (event) => {
    console.log(event);
    let oldRecord = [...letterRecord];
    if (event.over) {
      // // if the draggable JSX already exists in the array, remove it
      for (let i = 0; i < oldRecord.length; i++) {
        for (let j = 0; j < oldRecord[0].length; j++) {
          if (oldRecord[i][j].props) {
            if (oldRecord[i][j].props.id == event.active.id) {
              oldRecord[i][j] = "";
            }
          }
        }
      }

      // adding the draggable JSX to the array
      let row = extractRowColumn(event.over.id)[0] - 1;
      let column = extractRowColumn(event.over.id)[1] - 1;
      oldRecord[row][column] = returnDraggableObj(event.active.id);
    }
    console.log(oldRecord);
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
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="letterGrid">
          <LetterBox id="r1c1" chosenLetter={letterRecord[0][0]} />
          <LetterBox id="r1c2" chosenLetter={letterRecord[0][1]} />
          <LetterBox id="r1c3" chosenLetter={letterRecord[0][2]} />
          <LetterBox id="r1c4" chosenLetter={letterRecord[0][3]} />
          <LetterBox id="r1c5" chosenLetter={letterRecord[0][4]} />
          <LetterBox id="r1c6" chosenLetter={letterRecord[0][5]} />
          <LetterBox id="r1c7" chosenLetter={letterRecord[0][6]} />
          <LetterBox id="r1c8" chosenLetter={letterRecord[0][7]} />
          <LetterBox id="r2c1" chosenLetter={letterRecord[1][0]} />
          <LetterBox id="r2c2" chosenLetter={letterRecord[1][1]} />
          <LetterBox id="r2c3" chosenLetter={letterRecord[1][2]} />
          <LetterBox id="r2c4" chosenLetter={letterRecord[1][3]} />
          <LetterBox id="r2c5" chosenLetter={letterRecord[1][4]} />
          <LetterBox id="r2c6" chosenLetter={letterRecord[1][5]} />
          <LetterBox id="r2c7" chosenLetter={letterRecord[1][6]} />
          <LetterBox id="r2c8" chosenLetter={letterRecord[1][7]} />
        </div>
        {availableLetter === null ? draggableMarkup : null}
        {availableLetter2 === null ? draggableMarkup2 : null}
      </DndContext>
    </>
  );
};

export default Home;
