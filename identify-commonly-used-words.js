import lodash from "lodash";
import { readJsonFile } from "./src/read-json-file.js";

const { flatMap, map, uniq } = lodash;
const { maxWordLength, maxWordOccurrenceCount } = readJsonFile(
  "./environment-variables.json"
);
const wordBlockList = readJsonFile("./src/word-blocklist.json");
const textsToInspect = readJsonFile("./texts-to-inspect.json");

const identifyCommonlyUsedWords = () => {
  const wordCounts = flatMap(textsToInspect, (text) => {
    const words = splitWords(text);
    return uniq(words); // words appearing in the same text twice only count once to the overall word count
  })
    .map((word) => word.toLowerCase())
    .reduce((wordCounts, currentWord) => {
      const currentCount = wordCounts[currentWord];
      wordCounts[currentWord] = currentCount ? currentCount + 1 : 1;
      return wordCounts;
    }, {});

  return map(wordCounts, (count, word) => ({
    word,
    count,
  }))
    .filter(
      ({ word, count }) =>
        doesWordIncludeEnoughCharacters(word) &&
        doesWordOccurEnoughTimes(count) &&
        !isWordInBlockList(word)
    )
    .sort(sortByOccurrenceCountDescending);
};

const splitWords = (text) => {
  return text.match(/\w*/g).filter(Boolean);
};

const doesWordIncludeEnoughCharacters = (word) => word.length >= maxWordLength;

const doesWordOccurEnoughTimes = (number) => number >= maxWordOccurrenceCount;

const isWordInBlockList = (word) => wordBlockList.includes(word);

const sortByOccurrenceCountDescending = (firstWord, secondWord) =>
  secondWord.count - firstWord.count;

console.log(identifyCommonlyUsedWords());
