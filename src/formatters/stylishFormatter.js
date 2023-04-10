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
const getValue = (value, sym, currentDepth) =>
  `${indent(currentDepth)}${sym} ${node.key}: ${stringify(
    value,
    currentDepth
  )}${EOL}`;
const iter = (tree, depth) =>
  tree.map((node) => {
    switch (node.type) {
      case "added":
        return getValue(node.key, node.value, "+", depth);
      case "deleted":
        return getValue(node.key, node.value, "-", depth);
      case "equal":
        return getValue(node.key, node.value, " ", depth);
      case "updated":
        return `${getValue(node.key, node.dataOneValue, "-", depth)}${getValue(
          node.key,
          node.dataTwoValue,
          "+",
          depth
        )}`;
      case "children":
        return `${indent(depth)}  ${node.key}: {${EOL}${iter(
          node.children,
          depth + 1
        ).join("")}${indent(depth)}  }${EOL}`;
      default:
        throw new Error("Wrong node Type!");
    }
  });

const stylish = (innerTree) => `{${EOL}${iter(innerTree, 1).join("")}}`;

export default stylish;
