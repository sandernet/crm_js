const defaultPost = require("./defPost");
const defaultPut = require("./defPut");
const defaultDelete = require("./defDelete");
const defaultGet = require("./defGet");
const defaultDeleteRouter = require("./defDeleteRouter")(defaultDelete);
const defaultPostRouter = require("./defPostRouter")(defaultPost);
const defaultPutRouter = require("./defPutRouter")(defaultPut);
const defaultGetRouter = require("./defGetRouter")(defaultGet);
const defaultHelpRouter = require("./defGetHelpRouter");

module.exports = {
  defaultPost,
  defaultPut,
  defaultDelete,
  defaultGet,
  defaultPostRouter,
  defaultPutRouter,
  defaultDeleteRouter,
  defaultGetRouter,
  defaultHelpRouter,
};