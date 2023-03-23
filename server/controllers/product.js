const models = require("../db/models");
const { Op } = require("sequelize");

const model = models.product;


// Создание записи
const post = (req, res, promiseError) => {
  model
    .create({ ...req.body })
    .then((data) => {
      const { id = -1, name } = data;
      res.status(200).send({ id, name });
    })
    .catch(promiseError);
};


// Плучение данных
const getOneId = (externalCode) => {
  const searchId = externalCode ? { externalCode } : null;

  const where = { ...searchId }
  // выполняем запрос
  model
    .findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt", "chatId"],
      },
      order: [["id", "ASC"]],
      where: where,
    })
    .then((data) => {
      return data;
    });
};


// Плучение данных
const get = (req, res) => {
  const { search, id, limit, offset, ...other } = req.query;

  // указываем в каких полях нужно искать строку /product?search=<>
  const searchCaption = search
    ? {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { artical: { [Op.like]: `%${search}%` } },
      ],
    }
    : null;
  // поиск по id /product?id=<>
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

// Обновление записи 
const put = (req, res, promiseError) => {
  const { id, ...body } = req.body;

  if (!id) {
    throw new Error("Not found id in body");
  }

  model
    .update(body, { where: { id: id } })
    .then(() => {
      model
        .findOne({
          where: { id: id },
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        })
        .then((data) => {
          res.status(200).send(data);
        })
        .catch(promiseError);
    })
    .catch(promiseError);
};


// Удаление данных из таблици по id
const del = (req, res, promiseError) => {
  const { id } = req.body;

  if (!id) {
    throw new Error("Not found id in body");
  }

  model
    .destroy({ where: { id } })
    .then(() => {
      res.status(200).send({ id, message: "deleted" });
    })
    .catch(promiseError);
};

const { checkMethod } = require("../utils");

module.exports = (router, moduleName) => {
  router.post("/", checkMethod(post, moduleName));
  router.get("/", checkMethod(get, moduleName));
  router.put("/", checkMethod(put, moduleName));
  // С проверкой на авторизацию
  //router.delete("/", jwtCheck, checkMethod(del, moduleName));
  router.delete("/", checkMethod(del, moduleName));
};