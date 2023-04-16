import _ from "lodash";

const indent = (depth, spaceCount = 4) => " ".repeat(spaceCount * depth - 2);

const stringify = (data, treeDepth) => {
  if (!_.isObject(data)) return `${data}`;
  if (data === null) return null;
  const newObj = Object.entries(data).map(
    ([key, value]) =>
      `${indent(treeDepth + 1)}  ${key}: ${stringify(value, treeDepth + 1)}`
  );
  return ["{", ...newObj, `${indent(treeDepth)}  }`].join("\n");
};

const stylish = (innerTree) => {
  const iter = (tree, depth) =>
    tree.map((node) => {
      const getValue = (value, sign) =>
        `${indent(depth)}${sign} ${node.key}: ${stringify(value, depth)}\n`;
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
          return `${indent(depth)}  ${node.key}: {\n${iter(
            node.children,
            depth + 1
          ).join("")}${indent(depth)}  }\n`;
        default:
          throw new Error("Error");
      }
    });
  return `{\n${iter(innerTree, 1).join("")}}`;
};

export default stylish;
