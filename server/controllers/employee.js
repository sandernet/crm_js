const models = require("../db/models");
const { Op } = require("sequelize");
const { checkMethod } = require("../utils");
const {
  defaultPostRouter,
  defaultDeleteRouter,
  defaultPutRouter,
  defaultHelpRouter,
} = require("../utils/db");

let model = models.employee

// Получение данных
const get = (req, res) => {
  const { search, id, limit, offset, ...other } = req.query;

  // указываем в каких полях нужно искать строку /model?search=<>
  const searchCaption = search
    ? {
      [Op.or]: [
        { fullName: { [Op.like]: `%${search}%` } },
        { name: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
        { position: { [Op.like]: `%${search}%` } },
      ],
    }
    : null;

  // поиск по id /model?id=<>
  const searchId = id ? { id } : null;

  const where =
    searchCaption || searchId ? { ...searchCaption, ...searchId } : null;
  // выполняем запрос
  model
    .findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt", "chatId"],
      },
      order: [["id", "ASC"]],
      limit: parseInt(limit) ? parseInt(limit) : null,
      offset: parseInt(offset) ? parseInt(offset) : null,
      ...other,
      where: where,
    })
    .then((data) => {
      res.status(200).send(data);
    });
};

module.exports = (router, moduleName) => {
  //model = models[moduleName];

  router.get("/", checkMethod(get, moduleName));

  defaultHelpRouter(router, model);
  defaultPutRouter(router, moduleName, model, null);
  defaultPostRouter(router, moduleName, model, null);
  defaultDeleteRouter(router, moduleName, model, null);
};