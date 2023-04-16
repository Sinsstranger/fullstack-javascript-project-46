import fs from 'fs';
import yaml from 'js-yaml';
import { extname } from '../paths.js';

const dataParsing = (filepath) => {
  const format = extname(filepath);
  const data = fs.readFileSync(filepath);

  if (format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(data);
  }
  return JSON.parse(data);
};

export default dataParsing;
