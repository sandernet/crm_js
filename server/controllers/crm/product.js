const models = require("../../db/models");
const { Op } = require("sequelize");

const model = models.product;
const modelImagesProduct = models.imagesProduct;
const modelPrice = models.price;


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


// Получение данных
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


// Получение данных
const get = (req, res) => {
  const { search, id, limit, offset, ...other } = req.query;
  let dependencies

  if (other.full === 'true') {
    dependencies = [
      {
        model: modelImagesProduct,
        as: 'images',
        // limit: 1,
        //where: { "typeImage": "miniature" },
        attributes: {
          // Исключить поля field3 и field4 из модели 2
          exclude: ["createdAt", "updatedAt", "deletedAt"]
        }
      },
      {
        model: modelPrice,
        as: 'price',
        // limit: 1,
        //where: { "typeImage": "miniature" },
        attributes: {
          // Исключить поля field3 и field4 из модели 2
          // include: ["name", "price"],
          exclude: ["createdAt", "updatedAt", "deletedAt"]
        }
      }]
  }

  // указываем в каких полях нужно искать строку /product?search=<>
  const searchCaption = search
    ? {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { article: { [Op.like]: `%${search}%` } },
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
      include: dependencies,
      where: where,
    })
    .then((data) => {
      console.log(data)
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


// Удаление данных из Таблицы по id
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

module.exports = {
  post,
  get,
  put,
  del
};