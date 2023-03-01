const defaultPost = require("./defPost");
const defaultPut = require("./defPut");
const defaultDelete = require("./defDelete");
const defaultDeleteRouter = require("./defDeleteRouter")(defaultDelete);
const defaultPostRouter = require("./defPostRouter")(defaultPost);
const defaultPutRouter = require("./defPutRouter")(defaultPut);
const defaultHelpRouter = require("./defGetHelpRouter");

module.exports = {
  defaultPost,
  defaultPut,
  defaultDelete,
  defaultDeleteRouter,
  defaultPostRouter,
  defaultPutRouter,
  defaultHelpRouter,
};
