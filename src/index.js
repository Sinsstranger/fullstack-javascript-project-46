import parseFile from "./parseFile.js";
import buildDifferencesTree from "./diffBuilder/buildDifferencesTree.js";
import formatter from "./formatters/index.js";
const getDifferences = (filePath1, filePath2, outputFormat = "stylish") => {
  const fileOneData = parseFile(filePath1);
  const fileTwoData = parseFile(filePath2);
  const diffTree = buildDifferencesTree(fileOneData, fileTwoData);
  return formatter(diffTree, outputFormat);
};
export default getDifferences;
