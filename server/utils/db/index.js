const defaultPost = require("./defPost");
const defaultPut = require("./defPut");
const defaultDelete = require("./defDelete");
const defaultGet = require("./defGet");
const defaultDeleteRouter = require("./defDeleteRouter")(defaultDelete);
const defaultPostRouter = require("./defPostRouter")(defaultPost);
const defaultPutRouter = require("./defPutRouter")(defaultPut);
const defaultHelpRouter = require("./defGetHelpRouter");

module.exports = {
  defaultPost,
  defaultPut,
  defaultDelete,
  defaultGet,
  defaultDeleteRouter,
  defaultPostRouter,
  defaultPutRouter,
  defaultHelpRouter,
};