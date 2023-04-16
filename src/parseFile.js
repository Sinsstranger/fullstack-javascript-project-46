import fs from "fs";
import yaml from "js-yaml";
import { getFileExtension, resolvePath } from "../helpers/extPath.js";

const parseFile = (thePath) => {
  const fileExtension = getFileExtension(resolvePath(thePath));
  const rawFileData = fs.readFileSync(resolvePath(thePath), "utf-8");

  if (!/^(?:json|ya?ml)$/.test(fileExtension)) {
    throw new Error(`Unsupported filetype: ${fileExtension}`);
  }
  if(/^ya?ml$/.test(fileExtension)){
    return yaml.load(rawFileData);
  }
  return JSON.parse(rawFileData);
};

export default parseFile;
