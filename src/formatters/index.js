import _ from "lodash";
import plainFormatter from "./plainFormatter.js";
import stylishFormatter from "./stylishFormatter.js";

const formatter = (diffTree, outputFormat = 'stylish') => {
  const formats = {
    stylish: stylishFormatter,
    json: JSON.stringify,
    plain: plainFormatter,
    error: () => {
      throw new Error(`Unsupported output format!`);
    },
  };
  if (!_.has(formats, outputFormat)) {
    formats.error();
  }
  return formats[outputFormat](diffTree);
};

export default formatter;
