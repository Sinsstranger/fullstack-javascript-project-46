import formatter from "../src/formatters/index.js";
import path from "path";
import fs from "fs";
import buildDifferencesTree from "../src/diffBuilder/buildDifferencesTree.js";
import parseFile from "../src/parseFile.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("Test Guard Expression", () => {
  test("Throw Unsupported output format!", () => {
    expect(() => {
      formatter({}, "jpeg");
    }).toThrow("Unsupported output format!");
  });
});
describe("__fixtures__/file1.json __fixtures__/file2.json Stylish Format", () => {
  const formattedOutput = fs.readFileSync(
    path.resolve(__dirname, "../__fixtures__/json_output_stylish.txt"),
    "utf-8"
  );
  const diffTree = buildDifferencesTree(
    parseFile(path.resolve(__dirname, "../__fixtures__/file1.json")),
    parseFile(path.resolve(__dirname, "../__fixtures__/file2.json"))
  );
  expect(formatter(diffTree)).toEqual(formattedOutput);
});
