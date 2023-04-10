import _ from "lodash";

const buildDifferencesTree = (dataOne, dataTwo) => {
  const keysHeep = _.sortBy(
    _.union(Object.keys(dataOne), Object.keys(dataTwo))
  );
  return keysHeep.map((key) => {
    const dataOneValue = dataOne[key];
    const dataTwoValue = dataTwo[key];
    let diff = {};
    if (!_.has(dataOne, key)) {
      diff = { type: "added", key, value: dataTwoValue };
    } else if (!_.has(dataTwo, key)) {
      diff = { type: "deleted", key, value: dataOneValue };
    } else if (!_.isEqual(dataOneValue, dataTwoValue)) {
      diff = { type: "updated", key, dataOneValue, dataTwoValue };
    } else if (_.isObject(dataOneValue) && _.isObject(dataTwoValue)) {
      diff = {
        type: "children",
        key,
        children: buildDifferencesTree(dataOneValue, dataTwoValue),
      };
    } else {
      diff = { type: "equal", key, value: dataOneValue };
    }
    return diff;
  });
};

export default buildDifferencesTree;
