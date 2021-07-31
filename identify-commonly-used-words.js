import lodash from "lodash";
import {
  sortByOccurrenceCountDescending,
  splitWords,
} from "./src/utilities.js";
import wordBlockList from "./src/word-blocklist.json";

const { flatMap, map, uniq } = lodash;

export const identifyCommonlyUsedWords = (
  textsFilePath,
  minWordLength = 0,
  minWordOccurrenceCount = 0
) => {
  const textsToInspect = require(textsFilePath);

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
    .filter(
      ({ word, count }) =>
        word.length >= minWordLength &&
        count >= minWordOccurrenceCount &&
        !wordBlockList.includes(word)
    )
    .sort(sortByOccurrenceCountDescending);
};

if (require.main === module) {
  console.log(identifyCommonlyUsedWords("./texts-to-inspect.json", 3, 0));
}
