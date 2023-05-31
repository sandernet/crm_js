const models = require("../../db/models");
const { checkMethod } = require("../../utils");
const {
  defaultPostRouter,
  defaultDeleteRouter,
  defaultPutRouter,
} = require("../../utils/db");

const { get } = require('../../controllers/crm/category')

let model = models.category

// Получение данных
const getCategory = (req, res) => {
  res.status(200).send(get(req.query));
}

module.exports = (router, moduleName) => {
  model = models[moduleName];

  router.get("/", checkMethod(getCategory, moduleName));

  defaultPutRouter(router, moduleName, model, null);
  defaultPostRouter(router, moduleName, model, null);
  defaultDeleteRouter(router, moduleName, model, null);
};