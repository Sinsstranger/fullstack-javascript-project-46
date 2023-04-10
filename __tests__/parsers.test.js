import parseFile from "../src/parseFile.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonData = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../__fixtures__/file1.json"))
);
describe("Parsing files", () => {
  test("Parsing Json", () => {
    expect(parseFile("__fixtures__/file1.json")).toEqual(jsonData);
  });
});
