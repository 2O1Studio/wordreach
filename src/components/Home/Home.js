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
    static: firstFoundLetter.static,
  };
};

const getWordFromBoard = (board, firstLetter, axis, oppositeAxis) => {
  let word = "";
  let hasStaticLetter = false;

  const addLetterToWord = (board, word, currentLetter, axis, oppositeAxis) => {
    word = word + currentLetter.letter;
    const nextLetter = board.find(
      (b) =>
        b[axis] === currentLetter[axis] &&
        b[oppositeAxis] === currentLetter[oppositeAxis] + 1
    );
    if (currentLetter.static === true) {
      hasStaticLetter = true;
    }
    if (nextLetter && nextLetter.letter !== "") {
      return addLetterToWord(board, word, nextLetter, axis, oppositeAxis);
    }

    if (firstLetter.column === 0 || hasStaticLetter) return word;
    alert(
      "Your word must start on the first column, or branch off another word"
    );
    return false;
  };

  return addLetterToWord(board, word, firstLetter, axis, oppositeAxis);
};

const getWordAxis = (board, playedLetters) => {
  if (playedLetters.length > 1) {
    return playedLetters[0].played.row === playedLetters[1].played.row
      ? "row"
      : "column";
  }

  //Check adjacent board pieces

  const letter = playedLetters[0].played;
  if (
    board.find((b) => {
      if (
        b.letter !== "" &&
        b.row === letter.row &&
        (b.column === letter.column - 1 || b.column === letter.column + 1)
      ) {
        return true;
      }
      return false;
    })
  ) {
    return "row";
  }

  if (
    board.find((b) => {
      if (
        b.letter !== "" &&
        b.column === letter.column &&
        (b.row === letter.row - 1 || b.row === letter.row + 1)
      ) {
        return true;
      }
      return false;
    })
  ) {
    return "column";
  }

  // todo: If only 1 letter played, then use the board state to find axis
  alert("You can't play a 1 letter word; that's a letter, not a word.");
  return false;
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

  const playedBoard = board.flatMap((row, rowIndex) => {
    return row.flatMap((letter, columnIndex) => {
      const foundLetter = playableLetters.find(
        (l) => l.played.column === columnIndex && l.played.row === rowIndex
      );

      return {
        letter: foundLetter ? foundLetter.letter : letter,
        static: foundLetter ? false : true,
        row: rowIndex,
        column: columnIndex,
      };
    });
  });

  const axis = getWordAxis(playedBoard, playedLetters);

  if (!axis) return false;

  if (
    !playedLetters.every(
      (l) => l.played[axis] === playedLetters[0].played[axis]
    )
  ) {
    alert("You can only play a word in one direction at a time");
    return false;
  }
  const oppositeAxis = axis === "row" ? "column" : "row";

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
  const wordOrError = getWordFromBoard(
    playedBoard,
    firstLetter,
    axis,
    oppositeAxis
  );
  if (!wordOrError) return false;
  return validateWord(wordOrError);
};

const Home = () => {
  const [board, setBoard] = useState(initialBoardState);
  const [playableLetters, setPlayableLetters] = useState(
    initialPlayableLetters
  );
  const [hasWon, setHasWon] = useState(false);

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
            if (playedLetter.played.column === 7) {
              setHasWon(true);
              // Maybe show a restart button?
            }
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
                      staticLetter.toUpperCase()
                    )
                  }
                />
              );
            });
          })}
        </div>
        {hasWon ? (
          <div>you win!</div>
        ) : (
          <div className="playableLettersWrap">
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
        )}
      </DndContext>
      {hasWon ? null : <button onClick={confirmWord}>PLAY MOVE</button>}
    </div>
  );
};

export default Home;
