import { Command } from "commander";
const gendiff = new Command();
gendiff
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');

export default gendiff;