import _ from 'lodash';

const buildTree = (file1, file2) => {
  const keys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  return keys.map((key) => {
    const value1 = file1[key];
    const value2 = file2[key];
    if (!_.has(file1, key)) {
      return { type: 'added', key, value: value2 };
    }
    if (!_.has(file2, key)) {
      return { type: 'deleted', key, value: value1 };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { type: 'recursion', key, children: buildTree(value1, value2) };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        type: 'updated',
        key,
        value1,
        value2,
      };
    }
    return { type: 'equal', key, value: value1 };
  });
};

export default buildTree;
