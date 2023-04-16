const stringify = (value) => {
  if (value === null) return null;
  if (typeof value === 'object' && value !== null) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return String(value);
};

const plain = (innerTree) => {
  const format = (nodes, parent) => nodes
    .filter((node) => node.type !== 'equal')
    .map((node) => {
      const property = parent ? `${parent}.${node.key}` : node.key;
      switch (node.type) {
        case 'added': return `Property '${property}' was added with value: ${stringify(node.value)}`;
        case 'deleted': return `Property '${property}' was removed`;
        case 'updated': return `Property '${property}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        case 'recursion': return `${format(node.children, property)}`;
        default: throw new Error('Error');
      }
    }).join('\n');
  return format(innerTree, 0);
};

export default plain;
