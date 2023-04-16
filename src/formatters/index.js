import plain from './plain.js';
import stylish from './stylish.js';

const format = (tree, formatName) => {
  if (formatName === 'stylish') return stylish(tree);
  if (formatName === 'plain') return plain(tree);
  if (formatName === 'json') return JSON.stringify(tree);
  return Error('Error');
};

export default format;
