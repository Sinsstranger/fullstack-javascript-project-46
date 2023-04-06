import { Command } from "commander";
import getDifferences from "../src/index.js";
const gendiff = new Command();
gendiff
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .arguments("<filepath1> <filepath2>")
  .option("-f, --format <type>", "output format")
  .action((filePath1, filePath2, { format }) =>
    console.log(getDifferences(filePath1, filePath2, format))
  );

export default gendiff;
