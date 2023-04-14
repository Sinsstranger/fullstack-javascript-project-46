import { EOL } from "os";
const stringify = (value) => {
  if (value === null) {
    return null;
  }
  if (typeof value === "object" && value !== null) {
    return "[complex value]";
  }
  if (typeof value === "string") {
    return `'${value}'`;
  }
  return String(value);
};

const plainFormatter = (diffTree) => {
  const format = (nodes, parent) =>
    nodes
      .filter((node) => node.type !== "equal")
      .map((node) => {
        const property = parent ? `${parent}.${node.key}` : node.key;
        switch (node.type) {
          case "added":
            return `Property '${property}' was added with value: ${stringify(
              node.value
            )}`;
          case "deleted":
            return `Property '${property}' was removed`;
          case "updated":
            return `Property '${property}' was updated. From ${stringify(
              node.dataOneValue
            )} to ${stringify(node.dataTwoValue)}`;
          case "children":
            return `${format(node.children, property)}`;
          default:
            throw new Error("Error");
        }
      })
      .join(EOL);
  return format(diffTree, 0);
};

export default plainFormatter;
