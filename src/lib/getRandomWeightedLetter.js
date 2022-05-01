import { weightedLetterSet } from "./data/weightedLetterSet";

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getRandomWeightedLetter = () => {
  const position = randomIntFromInterval(0, weightedLetterSet.length - 1);
  return weightedLetterSet[position];
};
