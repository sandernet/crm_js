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
const get = (req, res) => {
  const { search, id, limit, offset, ...other } = req.query;
  console.log(limit, offset);

  // указываем в каких полях нужно искать строку /product?search=<>
  const searchCaption = search
    ? {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ],
    }
    : null;
  // поиск по id /?id=<>
  const searchId = id ? { id } : null;

  const where =
    searchCaption || searchId ? { ...searchCaption, ...searchId } : null;
  // выполняем запрос
  model
    .findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
      order: [["name", "ASC"]],
      limit: parseInt(limit) ? parseInt(limit) : null,
      offset: parseInt(offset) ? parseInt(offset) : null,
      where: where,
      // логирование запроса
      // logging: console.log
    })
    .then((data) => {
      res.status(200).send(data);
    });
};

// Получение данных
const getCategory = (req, res) => {
  res.status(200).send(getOneExternalCode(req.query));
}

module.exports = (router, moduleName) => {
  model = models[moduleName];

  router.get("/", checkMethod(get, moduleName));

  defaultPutRouter(router, moduleName, model, null);
  defaultPostRouter(router, moduleName, model, null);
  defaultDeleteRouter(router, moduleName, model, null);
};