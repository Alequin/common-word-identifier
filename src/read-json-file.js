import fs from "fs";
import path from "path";

export const readJsonFile = (filePath) =>
  JSON.parse(fs.readFileSync(path.resolve(filePath)).toString());
