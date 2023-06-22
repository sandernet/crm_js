const models = require("../../db/models");
const { Op } = require("sequelize");

const { defaultGet } = require("../../utils/db");
const { checkMethod } = require("../../utils");

const {
  defaultPostRouter,
  defaultDeleteRouter,
  defaultPutRouter,
} = require("../../utils/db");

let model = models.category

const getOneExternalCode = async (externalCodeMS) => {
  return await model.findOne({ where: { externalCodeMS: externalCodeMS } })
}

// Получение данных
const getCategory = (req, res) => {
  res.status(200).send(getOneExternalCode(req.query));
}

module.exports = (router, moduleName) => {
  model = models[moduleName];

  router.get("/", checkMethod(getCategory, moduleName));

  defaultPutRouter(router, moduleName, model, null);
  defaultPostRouter(router, moduleName, model, null);
  defaultDeleteRouter(router, moduleName, model, null);
};