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
const iter = (tree, depth) =>
  tree.map((node) => {
    const getValue = (value, sym) =>
      `${indent(depth)}${sym} ${node.key}: ${stringify(value, depth)}${EOL}`;
    switch (node.type) {
      case "added":
        return getValue(node.value, "+");
      case "deleted":
        return getValue(node.value, "-");
      case "equal":
        return getValue(node.value, " ");
      case "updated":
        return `${getValue(node.dataOneValue, "-")}${getValue(
          node.dataTwoValue,
          "+"
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
