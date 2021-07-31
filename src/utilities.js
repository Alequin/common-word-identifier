export const sortByOccurrenceCountDescending = (firstWord, secondWord) =>
  secondWord.count - firstWord.count;

export const splitWords = (text) => {
  return text.match(/\w*/g).filter(Boolean);
};
