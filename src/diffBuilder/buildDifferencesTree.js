import _ from "lodash";

const buildDifferencesTree = (dataOne, dataTwo) => {
  const keysHeep = _.sortBy(
    _.union(Object.keys(dataOne), Object.keys(dataTwo))
  );
  return keysHeep.map((key) => {
    const dataOneValue = dataOne[key];
    const dataTwoValue = dataTwo[key];
    if (!_.has(dataOne, key)) {
      return { type: "added", key, value: dataTwoValue };
    }
    if (!_.has(dataTwo, key)) {
      return { type: "deleted", key, value: dataOneValue };
    }
    if (!_.isEqual(dataOneValue, dataTwoValue)) {
      return { type: "updated", key, dataOneValue, dataTwoValue };
    }
    if (_.isObject(dataOneValue) && _.isObject(dataTwoValue)) {
      return {
        type: "children",
        key,
        children: buildDifferencesTree(dataOneValue, dataTwoValue),
      };
    }
    return { type: "equal", key, value: dataOneValue };
  });
};

export default buildDifferencesTree;
