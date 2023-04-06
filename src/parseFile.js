import fs from "fs";
import yaml from "js-yaml";
import { getFileExtension, resolvePath } from "../helpers/extPath.js";

const parseFile = (thePath) => {
  const fileExtension = getFileExtension(resolvePath(thePath));
  const rawFileData = fs.readFileSync(resolvePath(thePath), "utf-8");

  if (!/^(?:json|yam?l)$/.test(fileExtension)) {
    throw new Error(`Unsupported filetype: ${fileExtension}`);
  }
  if(/^yam?l$/.test(fileExtension)){
    return yaml.load(rawFileData);
  }
  return JSON.parse(rawFileData);
};

export default parseFile;
