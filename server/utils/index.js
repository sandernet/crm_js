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
const { writerFile } = require("./loaderFiles");

module.exports = {
  ...require("./validate"),
  ...require("./express"),
  ...require("./module"),
  ...require("./jwt"),
  ...require("./fs"),
  ...require("./logging"),
  ...{
    loader,
    getValue,
    groupBy,
    // clamp,
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
    writerFile
  }
}