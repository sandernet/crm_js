const loader = require("./loader");
const {
    getValue,
    groupBy,
    sleep,
    clamp,
    collectBy,
    flatten,
    indexBy,
    differenceBy,
    sumBy,
    ascending,
    descending,
    bifurcateBy,
} = require("./utils");

const { compareString, compareStringInArray } = require("./compare");
const { checkMethodSync, checkMethod } = require("./checkMethod");

module.exports = {
    loader,
    getValue,
    groupBy,
    sleep,
    clamp,
    collectBy,
    flatten,
    indexBy,
    differenceBy,
    sumBy,
    ascending,
    descending,
    bifurcateBy,
    compareString,
    compareStringInArray,
    checkMethod,
    checkMethodSync,
};