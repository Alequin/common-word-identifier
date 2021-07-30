import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// The root dir relative the this file
const rootDirectory = path.resolve(fileURLToPath(import.meta.url), "../..");

/** Reads and parses a json file to javascript. File paths are relative the to root dir in this repository */
export const readJsonFile = (filePath) =>
  JSON.parse(fs.readFileSync(path.resolve(rootDirectory, filePath)).toString());
