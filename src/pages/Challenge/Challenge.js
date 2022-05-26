import { React, useEffect, useMemo, useState } from "react";
import LetterBox from "../../components/LetterBox/LetterBox";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "../../components/Draggable/Draggable";
import styles from "./Challenge.module.scss";
import { Button } from "../../components/Button/Button";
import { PlayedLetterTile } from "../../components/PlayedLetterTile/PlayedLetterTile";
import { useLocation, useParams } from "react-router-dom";
import { getInitialLetters } from "../../lib/data/poc";
import { logEvent } from "../../lib/analytics";
import { Feedback } from "../../components/Feedback/Feedback";
import {
  checkPlayedWordIsValidOnBoard,
  getSavedGameState,
  initialBoardState,
  updateSavedGameState,
} from "../../lib/game/validation";
import { useAlert } from "@blaumaus/react-alert";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export const LetterTile = ({
  id,
  letter,
  isActive,
  setActiveTile,
  disablePointerEvent,
}) => {
  return (
    <Draggable
      isActive={isActive}
      id={id}
      setActiveTile={setActiveTile}
      disablePointerEvent={disablePointerEvent}
    >
      {letter.toUpperCase()}
    </Draggable>
  );
};

const Challenge = () => {
  const alert = useAlert();
  const query = useQuery();
  let { letterSet } = useParams();
  if (!letterSet) {
    letterSet = 1;
  }
  const [isLoading, setIsLoading] = useState(true);
  const [board, setBoard] = useState(initialBoardState);
  const [playableLetters, setPlayableLetters] = useState(
    getInitialLetters(letterSet)
  );
  const [attempts, setAttempts] = useState(0);
  const [turns, setTurns] = useState(0);
  const [hasWon, setHasWon] = useState(false);

  const [activeTile, setActiveTile] = useState(null);

  const confirmWord = async () => {
    setAttempts((i) => i + 1);
    try {
      const isValid = await checkPlayedWordIsValidOnBoard(
        board,
        playableLetters
      );
      if (!isValid) {
        return false;
      }
    } catch (error) {
      if (error.name === "Game Validation") {
        alert.show(error.message);
        return false;
      } else {
        throw error;
      }
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
    setTurns((i) => i + 1);
  };

  const handleDragStart = (event) => {};

  const handleDragEnd = (event) => {
    const thisLetter = playableLetters.find((p) => p.id === event.active.id);

    const foundRow = event?.collisions?.find(
      (c) =>
        typeof c?.data?.droppableContainer?.data?.current?.row !== "undefined"
    );

    const foundColumn = event?.collisions?.find(
      (c) =>
        typeof c?.data?.droppableContainer?.data?.current?.column !==
        "undefined"
    );
    const isOnSameSquare =
      (foundRow &&
        thisLetter?.played?.row ===
          foundRow.data.droppableContainer.data.current.row &&
        thisLetter?.played?.column ===
          foundColumn.data.droppableContainer.data.current.column) ||
      (thisLetter?.played?.row === event?.over?.data?.current?.row &&
        thisLetter?.played?.column === event?.over?.data?.current?.column);

    if (
      isOnSameSquare &&
      event.delta &&
      event.delta.x < 70 &&
      event.delta.y < 70 &&
      event.delta.x > -70 &&
      event.delta.y > -70
    ) {
      if (event.active.id === activeTile) {
        return setActiveTile(null);
      }
      logEvent("tap");
      return setActiveTile(event.active.id);
    }
    setPlayableLetters((oldSet) => {
      let pieceToUpdate;

      const newSet = oldSet.map((item) => {
        if (item.id === event.active.id) {
          // This will never be run for tap events, only drag events
          if (!event.over) {
            logEvent("tile action", { dropped: "off the board" });
            return { ...item, played: false };
          }
          const { row, column } = event.over.data.current;
          if (board[row][column] !== "") {
            logEvent("tile action", { dropped: "over existing letter" });
            return item;
          }
          const found = playableLetters.find(
            (o) => o.played?.row === row && o.played?.column === column
          );
          if (found) {
            logEvent("tile action", { dropped: "over existing tile" });
            pieceToUpdate = {
              ...found,
              played: item.played,
            };
          }
          logEvent("tile action", { dropped: "on a free space" });
          return { ...item, played: { row, column } };
        }

        setActiveTile(null);

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

  const clickOnBoard = (boardData) => {
    const syntheticEvent = {
      active: {
        id: activeTile,
      },
      over: {
        data: {
          current: {
            row: boardData.row,
            column: boardData.column,
          },
        },
      },
    };
    handleDragEnd(syntheticEvent);
  };

  useEffect(() => {
    try {
      const savedGameState = JSON.parse(getSavedGameState(letterSet));
      if (savedGameState) {
        logEvent("game started", {
          gameId: letterSet,
          time: new Date().toISOString(),
        });
        setBoard(savedGameState.board);
        setPlayableLetters(savedGameState.playableLetters);
        setHasWon(savedGameState.hasWon ?? false);
        setAttempts(savedGameState.attempts);
        setTurns(savedGameState.turns);
      }
    } catch (error) {}
    setIsLoading(false);
  }, [letterSet]);

  useEffect(() => {
    if (!isLoading) {
      updateSavedGameState(letterSet, {
        board,
        playableLetters,
        hasWon,
        attempts,
        turns,
      });
    }
  }, [board, playableLetters, letterSet, isLoading, hasWon, turns, attempts]);
  useEffect(() => {
    if (hasWon) {
      logEvent("game ended", {
        gameId: letterSet,
        time: new Date().toISOString(),
      });
    }
  }, [hasWon, letterSet]);

  const placeActiveTileBackToPlayableArea = () => {
    if (!activeTile) return;

    setPlayableLetters((letters) => {
      return letters.map((letter) => {
        if (letter.id !== activeTile) return letter;
        return {
          ...letter,
          played: false,
        };
      });
    });
    setActiveTile(null);
  };

  if (isLoading) {
    return "Loading...";
  }
  return (
    <>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className={styles.wrapper}>
          <div className={styles.letterGrid}>
            {board.map((row, rowIndex) => {
              return row.map((staticLetter, columnIndex) => {
                const playedLetter = playableLetters.find(
                  (o) =>
                    o.played?.row === rowIndex &&
                    o.played?.column === columnIndex
                );
                return (
                  <LetterBox
                    row={rowIndex}
                    column={columnIndex}
                    id={`r${rowIndex}c${columnIndex}`}
                    key={`r${rowIndex}c${columnIndex}`}
                    activeTile={activeTile}
                    playableLetters={playableLetters}
                    onClick={clickOnBoard}
                    chosenLetter={
                      playedLetter ? (
                        <LetterTile
                          setActiveTile={setActiveTile}
                          id={playedLetter.id}
                          letter={playedLetter.letter}
                          isActive={activeTile === playedLetter.id}
                          disablePointerEvent={
                            activeTile !== null &&
                            activeTile !== playedLetter.id
                          }
                        />
                      ) : staticLetter === "" ? (
                        ""
                      ) : (
                        <PlayedLetterTile>
                          {staticLetter.toUpperCase()}
                        </PlayedLetterTile>
                      )
                    }
                  />
                );
              });
            })}
          </div>
        </div>
        {hasWon ? (
          <div>
            <p
              style={{
                textAlign: "center",
                marginTop: 10,
                marginBottom: 20,
                fontWeight: 600,
              }}
            >
              Well done, you've reached the other side!
            </p>
            <p
              style={{
                textAlign: "center",
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <br />
              It took you {turns} turns to win!
              <br />
              You made {attempts - turns} invalid moves
              <br />
              You used {24 - playableLetters.length} letters out of 24
              <br />
              You had {playableLetters.length} letters left
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "12px",
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              <Button center to="/">
                Play again
              </Button>
              {/* <Button
                isButton
                center
                onClick={() => alert.show("Sorry, work in progress!")}
              >
                Share your score
              </Button> */}
            </div>
            <Feedback />
          </div>
        ) : (
          <div
            className={styles.playableLettersWrap}
            onClick={placeActiveTileBackToPlayableArea}
          >
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
                  isActive={activeTile === letter.id}
                  id={letter.id}
                />
              );
            })}
          </div>
        )}
      </DndContext>
      {hasWon ? (
        <div>
          {new Array(20).fill("").map((c, i) => (
            <div key={i} className="confetti-piece" />
          ))}
        </div>
      ) : (
        <Button isButton center onClick={confirmWord}>
          PLAY MOVE
        </Button>
      )}
      {query.get("dev") ? (
        <>
          <p>Turns: {turns}</p>
          <p>Attempts: {attempts}</p>
          <p>HasWon: {hasWon}</p>
          <p>LettersUsed: {24 - playableLetters.length}</p>
          <p>LettersLeft: {playableLetters.length}</p>

          <button
            onClick={() => {
              window.localStorage.removeItem(
                `gameSaves${
                  letterSet === "daily"
                    ? letterSet
                    : new Date().toLocaleDateString()
                }`
              );
              setIsLoading(false);
              setBoard(initialBoardState);
              setPlayableLetters(getInitialLetters(letterSet));
              setAttempts(0);
              setTurns(0);
              setHasWon(false);
            }}
          >
            RESET GAME
          </button>
        </>
      ) : null}
    </>
  );
};

export default Challenge;
