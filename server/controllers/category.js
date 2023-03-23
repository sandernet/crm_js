const models = require("../db/models");
const { Op } = require("sequelize");
const { checkMethod } = require("../utils");
const {
  defaultPostRouter,
  defaultDeleteRouter,
  defaultPutRouter,
  defaultHelpRouter,
} = require("../utils/db");

let model = models.category
// ===================================================
// МОЙ КОД ДЛЯ МОЙ СКЛАД
// поиск категории в таблице по названию
const getSearchCategories = (name) => {
  return model.findOne({ where: { name: name } })
}

// добавляет новую категорию в таблицу;
const addCategory = (data) => {
  const { name, description, parent_id } = data // достаем диструктуризацию массива
  // создаем запись в таблице и получаем её 
  // возращаем запись
  return model.create({ name, description, parent_id }) // создаем запись в таблице и получаем её
}
// МОЙ КОД ДЛЯ МОЙ СКЛАД
// ===================================================

// Плучение данных
const get = (req, res) => {
  const { search, id, limit, offset, ...other } = req.query;

  // указываем в каких полях нужно искать строку /model?search=<>
  const searchCaption = search
    ? {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
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
  model = models[moduleName];

  router.get("/", checkMethod(get, moduleName));

  defaultHelpRouter(router, model);
  defaultPutRouter(router, moduleName, model, null);
  defaultPostRouter(router, moduleName, model, null);
  defaultDeleteRouter(router, moduleName, model, null);
};