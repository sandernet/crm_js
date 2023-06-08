const models = require("../../db/models");
const { Op } = require("sequelize");

const model = models.product;
const modelImagesProduct = models.imagesProduct;
const modelPrice = models.price;
const modelProperty = models.property;


const property = {
  model: modelProperty,
  as: 'property',
  // limit: 1,
  where: {
    "propertyMPId": { //  поле для отбора
      [Op.eq]: null, // Используем оператор сравнения "больше"
    }
  },
  attributes: {
    // Исключить поля field3 и field4 из модели 2
    exclude: ["createdAt", "updatedAt", "deletedAt"]
  }
};

const images = {
  model: modelImagesProduct,
  as: 'images',
  // limit: 1,
  //where: { "typeImage": "miniature" },
  attributes: {
    // Исключить поля field3 и field4 из модели 2
    exclude: ["createdAt", "updatedAt", "deletedAt"]
  }
};
const price = {
  model: modelPrice,
  as: 'price',
  // limit: 1,
  // where: {
  //   "price": { поле для отбора
  //     [Op.gt]: 0, // Используем оператор сравнения "больше"
  //   }
  // },
  attributes: {
    // Исключить поля field3 и field4 из модели 2
    // include: ["name", "price"],
    exclude: ["createdAt", "updatedAt", "deletedAt"]
  }
};


// Получение данных
const get = (req, res) => {
  const { search, id, limit, offset, ...other } = req.query;

  // Добавляем связанные таблицы
  let include = [];
  (other.images === 'true' || other.full === 'true') ? include.push(images) : undefined;
  (other.price === 'true' || other.full === 'true') ? include.push(price) : undefined;
  (other.property === 'true' || other.full === 'true') ? include.push(property) : undefined;

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
      where: where,
      include: include,

    })
    .then((data) => {
      res.status(200).send(data);
    });
};

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