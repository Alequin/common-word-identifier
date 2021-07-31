import fs from "fs";
import { identifyCommonlyUsedWords } from "./identify-commonly-used-words";

describe("identifyCommonlyUsedWords", () => {
  it("Counts each word once when the text only includes unique words", () => {
    const testFile = `./test-texts-${Date.now()}.json`;

    fs.writeFileSync(
      testFile,
      JSON.stringify(["dog cat mouse cheese chicken"])
    );

    expect(identifyCommonlyUsedWords(testFile)).toEqual([
      { count: 1, word: "dog" },
      { count: 1, word: "cat" },
      { count: 1, word: "mouse" },
      { count: 1, word: "cheese" },
      { count: 1, word: "chicken" },
    ]);

    fs.unlinkSync(testFile);
  });

  it("Counts each word once when only one text is given and words occur multiple times", () => {
    const testFile = `./test-texts-${Date.now()}.json`;

    fs.writeFileSync(testFile, JSON.stringify(["dog dog dog dog dog"]));

    expect(identifyCommonlyUsedWords(testFile)).toEqual([
      { count: 1, word: "dog" },
    ]);

    fs.unlinkSync(testFile);
  });

  it("Counts words multiple times when they appear in multiple texts", () => {
    const testFile = `./test-texts-${Date.now()}.json`;

    fs.writeFileSync(
      testFile,
      JSON.stringify(["dog cat mouse", "dog cat cheese"])
    );

    expect(identifyCommonlyUsedWords(testFile)).toEqual([
      { count: 2, word: "dog" },
      { count: 2, word: "cat" },
      { count: 1, word: "mouse" },
      { count: 1, word: "cheese" },
    ]);

    fs.unlinkSync(testFile);
  });

  it("Order words by occurrence count", () => {
    const testFile = `./test-texts-${Date.now()}.json`;

    fs.writeFileSync(
      testFile,
      JSON.stringify([
        "dog cat mouse, cheese",
        "dog cat mouse",
        "dog cat",
        "dog",
      ])
    );

    expect(identifyCommonlyUsedWords(testFile)).toEqual([
      { count: 4, word: "dog" },
      { count: 3, word: "cat" },
      { count: 2, word: "mouse" },
      { count: 1, word: "cheese" },
    ]);

    fs.unlinkSync(testFile);
  });
});
