import { React, useState, useEffect } from "react";
import "./Home.scss";
import LetterBox from "../LetterBox/LetterBox";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "../Draggable/Draggable";

const initialPlayableLetters = [
  { id: "1", letter: "a", played: false },
  { id: "2", letter: "b", played: false },
  { id: "3", letter: "c", played: false },
  { id: "4", letter: "d", played: false },
  { id: "5", letter: "e", played: false },
  { id: "6", letter: "f", played: false },
  { id: "7", letter: "g", played: false },
  { id: "8", letter: "h", played: false },
  { id: "9", letter: "i", played: false },
  { id: "10", letter: "j", played: false },
];
const initialBoardState = [
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
];

const LetterTile = ({ id, letter }) => {
  return <Draggable id={id}>{letter}</Draggable>;
};

const Home = () => {
  const [board, setBoard] = useState(initialBoardState);
  const [playableLetters, setPlayableLetters] = useState(
    initialPlayableLetters
  );

  const handleDragStart = (event) => {
    console.log(event);
  };

  const handleDragEnd = (event) => {
    setPlayableLetters((oldSet) => {
      let pieceToUpdate;

      const newSet = oldSet.map((item) => {
        // Check if the item we're mapping over has the id of the item that has been dropped
        if (item.id === event.active.id) {
          // If the item is not dropped over a valid target then return the item to the playable list (not on the board)
          if (!event.over) {
            return { ...item, played: false };
          }
          // This is destructuring, we're pulling row and column out of element.over.data.current into it's own variable
          const { row, column } = event.over.data.current;

          // if the board has a staticLetter, don't do anything (put it back where it was)
          if (board[row][column] !== "") {
            return item;
          }

          // Look through the list of playable letter to find a letter with a played row and column of the dropped box
          const found = playableLetters.find(
            (o) => o.played?.row === row && o.played?.column === column
          );

          if (found) {
            // Set pieceToUpdate to the found playedLetter and update it's played position to the current item's played position
            // (we don't return in this statement because we have no other things to check for and we just want to play the move)
            pieceToUpdate = {
              ...found,
              played: item.played,
            };
          }
          // play the move
          return { ...item, played: { row, column } };
        }

        return item;
      });

      if (pieceToUpdate) {
        return newSet.map((i) => {
          if (pieceToUpdate.id === i.id) {
            return pieceToUpdate;
          }
          return i;
        });
      }

      return newSet;
    });
  };

  return (
    <div>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="letterGrid">
          {board.map((row, rowIndex) => {
            return row.map((staticLetter, columnIndex) => {
              const playedLetter = playableLetters.find(
                (o) =>
                  o.played?.row === rowIndex && o.played?.column === columnIndex
              );
              return (
                <LetterBox
                  row={rowIndex}
                  column={columnIndex}
                  id={`r${rowIndex}c${columnIndex}`}
                  chosenLetter={
                    playedLetter ? (
                      <LetterTile
                        id={playedLetter.id}
                        letter={playedLetter.letter}
                      />
                    ) : (
                      staticLetter
                    )
                  }
                />
              );
            });
          })}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {playableLetters
            .filter((i) => i.played === false)
            .map((letter) => {
              return (
                <LetterTile
                  key={letter.id}
                  letter={letter.letter}
                  id={letter.id}
                />
              );
            })}
        </div>
      </DndContext>
    </div>
  );
};

export default Home;
