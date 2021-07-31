import {
  maxWordLength,
  maxWordOccurrenceCount,
} from "../environment-variables.json";
import wordBlockList from "./word-blocklist.json";

const doesWordIncludeEnoughCharacters = (word) => word.length >= maxWordLength;

const doesWordOccurEnoughTimes = (number) => number >= maxWordOccurrenceCount;

const isWordInBlockList = (word) => wordBlockList.includes(word);

export const sortByOccurrenceCountDescending = (firstWord, secondWord) =>
  secondWord.count - firstWord.count;

export const splitWords = (text) => {
  return text.match(/\w*/g).filter(Boolean);
};

export const shouldIncludeWordInFinalOutput = (word, occurrenceCount) =>
  doesWordIncludeEnoughCharacters(word) &&
  doesWordOccurEnoughTimes(occurrenceCount) &&
  !isWordInBlockList(word);
