import _ from "lodash";
import { EOL } from "os";
const indent = (depth, spaceCount = 4) => " ".repeat(spaceCount * depth - 2);

const stringify = (data, treeDepth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  if (data === null) {
    return null;
  }
  const newObj = Object.entries(data).map(
    ([key, value]) =>
      `${indent(treeDepth + 1)}  ${key}: ${stringify(value, treeDepth + 1)}`
  );
  return ["{", ...newObj, `${indent(treeDepth)}  }`].join(EOL);
};
const getValue = (key, value, sym, currentDepth) =>
  `${indent(currentDepth)}${sym} ${key}: ${stringify(
    value,
    currentDepth
  )}${EOL}`;
const iter = (tree, depth) =>
  tree.map((node) => {
    let result = {};
    switch (node.type) {
      case "added":
        result = getValue(node.key, node.value, "+", depth);
        break;
      case "deleted":
        result = getValue(node.key, node.value, "-", depth);
        break;
      case "equal":
        (result = getValuenode.key), (node.value, " ", depth);
        break;
      case "updated":
        result = `${getValue(
          node.key,
          node.dataOneValue,
          "-",
          depth
        )}${getValue(node.key, node.dataTwoValue, "+", depth)}`;
        break;
      case "children":
        result = `${indent(depth)}  ${node.key}: {${EOL}${iter(
          node.children,
          depth + 1
        ).join("")}${indent(depth)}  }${EOL}`;
        break;
      default:
        throw new Error("Wrong node Type!");
    }
    return result;
  });

const stylish = (innerTree) => `{${EOL}${iter(innerTree, 1).join("")}}`;

export default stylish;
