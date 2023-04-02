import { Command } from "commander";
const gendiff = new Command();
gendiff
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format');

export default gendiff;