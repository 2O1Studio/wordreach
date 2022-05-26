import { weightedLetterSet } from "./data/weightedLetterSet";
import drs from "deterministic-random-sequence";

function randomIntFromInterval(min, max, randomNumber) {
  // min and max included
  return Math.floor((randomNumber ?? Math.random()) * (max - min + 1) + min);
}

export const getRandomWeightedLetter = (randomNumber) => {
  const position = randomIntFromInterval(
    0,
    weightedLetterSet.length - 1,
    randomNumber
  );
  return weightedLetterSet[position];
};

export const getLetterSet = (seed = "POC") => {
  const random = drs(seed);
  let letters = [];
  for (let i = 0; i < 22; i++) {
    const randomNumber = random();
    letters.push(getRandomWeightedLetter(randomNumber));
  }
  return letters;
};
