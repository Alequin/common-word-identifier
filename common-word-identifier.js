const flatMap = require("lodash/flatMap");
const groupBy = require("lodash/groupBy");
const map = require("lodash/map");
const uniq = require("lodash/uniq");

const shortDescriptions = [
  "this is a test and is a test to test the test cat dog dog woof foo bar",
];

const longDescriptions = [];

const splitWords = (description) =>
  uniq(description.match(/\w*/g).filter((x) => x));

const wordBlacklist = [
  "the",
  "you",
  "and",
  "your",
  "with",
  "for",
  "this",
  "will",
  "that",
  "are",
  "can",
  "use",
  "from",
  "just",
  "not",
  "any",
  "set",
  "has",
  "may",
  "off",
  "also",
  "give",
  "get",
];
console.log(
  map(
    groupBy(flatMap(shortDescriptions, splitWords), (word) =>
      word.toLowerCase()
    ),
    (wordArray, word) => ({ word, count: wordArray.length })
  )
    .filter(
      ({ word, count }) =>
        word.length >= 3 && count >= 0 && !wordBlacklist.includes(word)
    )
    .sort((a, b) => b.count - a.count)
);
