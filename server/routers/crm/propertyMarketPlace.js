// const models = require("../../db/models");
const { get, model } = require("../../controllers/crm/propertyMarketPlace")
const { checkMethod } = require("../../utils");
const {
  defaultPostRouter,
  defaultDeleteRouter,
  defaultPutRouter,
} = require("../../utils/db");

// let model = models.propertyMarketPlace

module.exports = (router, moduleName) => {
  //model = models[moduleName];

  router.get("/", checkMethod(get, moduleName));

  defaultPutRouter(router, moduleName, model, null);
  defaultPostRouter(router, moduleName, model, null);
  defaultDeleteRouter(router, moduleName, model, null);
};