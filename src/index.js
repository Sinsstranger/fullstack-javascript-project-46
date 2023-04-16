import dataParsing from './parsers/parsing.js';
import { paths } from './paths.js';
import buildTree from './compare.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = dataParsing(paths(filepath1));
  const file2 = dataParsing(paths(filepath2));
  return format(buildTree(file1, file2), formatName);
};

export default genDiff;
