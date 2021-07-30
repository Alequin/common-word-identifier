import lodash from "lodash";
import { readJsonFile } from "./src/read-json-file.js";
import {
  shouldIncludeWordInFinalOutput,
  sortByOccurrenceCountDescending,
  splitWords,
} from "./src/utilities.js";

const { flatMap, map, uniq } = lodash;

const textsToInspect = readJsonFile("./texts-to-inspect.json");

const identifyCommonlyUsedWords = () => {
  const wordCounts = flatMap(textsToInspect, (text) => {
    const words = splitWords(text).map((word) => word.toLowerCase());
    return uniq(words); // words appearing in the same text twice only count once towards the overall count
  }).reduce((wordCounts, currentWord) => {
    const currentCount = wordCounts[currentWord];
    wordCounts[currentWord] = currentCount ? currentCount + 1 : 1;
    return wordCounts;
  }, {});

  return map(wordCounts, (count, word) => ({
    word,
    count,
  }))
    .filter(({ word, count }) => shouldIncludeWordInFinalOutput(word, count))
    .sort(sortByOccurrenceCountDescending);
};

console.log(identifyCommonlyUsedWords());
