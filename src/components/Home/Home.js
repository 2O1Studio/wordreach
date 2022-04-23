import { React, useState } from "react";
import "./Home.scss";
import LetterBox from "../LetterBox/LetterBox";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "../Draggable/Draggable";

const validateWord = async (word) => {
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  const status = await res.status;
  // const data = await res.json();
  if (status === 200) {
    return true;
  }
  return false;
};

const initialPlayableLetters = [
  { id: "1", letter: "n", played: false },
  { id: "2", letter: "t", played: false },
  { id: "3", letter: "l", played: false },
  { id: "4", letter: "e", played: false },
  { id: "5", letter: "m", played: false },
  { id: "6", letter: "t", played: false },

  { id: "7", letter: "a", played: false },
  { id: "8", letter: "t", played: false },
  { id: "9", letter: "i", played: false },
  { id: "10", letter: "n", played: false },
  { id: "11", letter: "n", played: false },
  { id: "12", letter: "t", played: false },
  { id: "13", letter: "a", played: false },
  { id: "14", letter: "h", played: false },
  { id: "15", letter: "a", played: false },
  { id: "16", letter: "r", played: false },
  { id: "17", letter: "h", played: false },
  { id: "18", letter: "x", played: false },
  { id: "19", letter: "n", played: false },
  { id: "20", letter: "p", played: false },
  { id: "21", letter: "h", played: false },
  { id: "22", letter: "y", played: false },
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
  return <Draggable id={id}>{letter.toUpperCase()}</Draggable>;
};

const checkPreviousPosition = (
  board,
  currentPosition,
  axisToDecrement,
  axis,
  axisPosition
) => {
  let positionToCheck = currentPosition - 1;

  if (positionToCheck < 0) {
    return currentPosition;
  }

  const piece = board.find(
    (i) => i[axisToDecrement] === positionToCheck && i[axis] === axisPosition
  );

  if (piece.letter !== "") {
    return checkPreviousPosition(
      board,
      positionToCheck,
      axisToDecrement,
      axis,
      axisPosition
    );
  }
  return currentPosition;
};

const getFirstLetterOfWordOnBoard = (board, arbitraryLetter, axis) => {
  const oppositeAxis = axis === "row" ? "column" : "row";
  const startingPosition = arbitraryLetter.played[oppositeAxis];
  const firstLetterPosition = checkPreviousPosition(
    board,
    startingPosition,
    oppositeAxis,
    axis,
    arbitraryLetter.played[axis]
  );

  const firstFoundLetter = board.find(
    (b) =>
      b[axis] === arbitraryLetter.played[axis] &&
      b[oppositeAxis] === firstLetterPosition
  );
  return {
    letter: firstFoundLetter.letter,
    [axis]: arbitraryLetter.played[axis],
    [oppositeAxis]: firstLetterPosition,
  };
};

const getWordFromBoard = (board, firstLetter, axis, oppositeAxis) => {
  let word = "";

  const addLetterToWord = (board, word, currentLetter, axis, oppositeAxis) => {
    word = word + currentLetter.letter;
    const nextLetter = board.find(
      (b) =>
        b[axis] === currentLetter[axis] &&
        b[oppositeAxis] === currentLetter[oppositeAxis] + 1
    );
    if (nextLetter && nextLetter.letter !== "") {
      return addLetterToWord(board, word, nextLetter, axis, oppositeAxis);
    }
    return word;
  };

  return addLetterToWord(board, word, firstLetter, axis, oppositeAxis);
};

const getWordAxis = (board, playedLetters) => {
  if (playedLetters.length > 1) {
    return playedLetters[0].played.row === playedLetters[1].played.row
      ? "row"
      : "column";
  }

  // todo: If only 1 letter played, then use the board state to find axis
  alert("You've only played 1 letter and we don't account for this yet");
  return "test";
};

const checkPlayedWordIsValidOnBoard = (board, playableLetters) => {
  const playedLetters = playableLetters.filter((l) => l.played !== false);
  if (playedLetters === 0) {
    return false;
  }
  const arbitraryLetter = playedLetters[0];

  if (!arbitraryLetter) {
    alert("Please play at least 1 letter");
    return false;
  }

  const axis = getWordAxis(board, playedLetters);
  if (
    !playedLetters.every(
      (l) => l.played[axis] === playedLetters[0].played[axis]
    )
  ) {
    alert("You can only play a word in one direction at a time");
    return false;
  }
  const oppositeAxis = axis === "row" ? "column" : "row";

  const playedBoard = board.flatMap((row, rowIndex) => {
    return row.flatMap((letter, columnIndex) => {
      const foundLetter = playableLetters.find(
        (l) => l.played.column === columnIndex && l.played.row === rowIndex
      );

      return {
        letter: foundLetter ? foundLetter.letter : letter,
        static: !foundLetter,
        row: rowIndex,
        column: columnIndex,
      };
    });
  });

  // This looks backwards to find the first letter
  const firstLetter = getFirstLetterOfWordOnBoard(
    playedBoard,
    arbitraryLetter,
    axis
  );

  const boardInAxisDirection = playedBoard.filter((b) => {
    return b[axis] === firstLetter[axis];
  });
  let blankSpaceFound = false;
  let spaceFoundInWord = false;
  for (
    let i = firstLetter[oppositeAxis];
    i < boardInAxisDirection.length;
    i++
  ) {
    const element = boardInAxisDirection[i];
    if (spaceFoundInWord) {
      continue;
    }
    if (blankSpaceFound && element.letter !== "") {
      spaceFoundInWord = true;
    }
    if (element.letter === "") {
      blankSpaceFound = true;
    }
  }

  if (spaceFoundInWord) {
    alert("You have a space in your word.");
    return false;
  }

  const word = getWordFromBoard(playedBoard, firstLetter, axis, oppositeAxis);
  return validateWord(word);
};

const Home = () => {
  const [board, setBoard] = useState(initialBoardState);
  const [playableLetters, setPlayableLetters] = useState(
    initialPlayableLetters
  );

  const confirmWord = async () => {
    const isValid = await checkPlayedWordIsValidOnBoard(board, playableLetters);
    if (!isValid) {
      alert("Word not valid");
      return false;
    }
    setBoard((old) => {
      return old.map((row, rowIndex) => {
        return row.map((item, columnIndex) => {
          const playedLetter = playableLetters.find(
            (o) =>
              o.played?.row === rowIndex && o.played?.column === columnIndex
          );
          if (playedLetter) {
            return playedLetter.letter;
          }
          return item;
        });
      });
    });
    setPlayableLetters((old) => {
      return old.filter((letter) => letter.played === false);
    });
  };

  const handleDragStart = (event) => {};

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
          {playableLetters.map((letter, index) => {
            if (index >= 6) {
              return null;
            }
            if (letter.played !== false) {
              return null;
            }
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

      <button onClick={confirmWord}>confirm word</button>
    </div>
  );
};

export default Home;
