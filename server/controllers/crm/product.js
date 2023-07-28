const models = require("../../db/models");
const { Op } = require("sequelize");

const model = models.product;
const modelImagesProduct = models.imagesProduct;
const modelPrice = models.price;
const modelProperty = models.property;

const { checkMethod } = require("../../utils");



// Связанные таблицы
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
  const { search, id, limit, offset, category, ...other } = req.query;
  console.log(limit, offset);

  // Добавляем связанные таблицы
  let include = [];
  (other.images === 'true' || other.full === 'true') ? include.push(images) : null;
  (other.price === 'true' || other.full === 'true') ? include.push(price) : null;
  (other.property === 'true' || other.full === 'true') ? include.push(property) : null;

  const categoryId = category == undefined ? { categoryId: { [Op.is]: null } } : {
    categoryId: { [Op.eq]: Number(category) }
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
    searchCaption || searchId || categoryId ? { ...searchCaption, ...searchId, ...categoryId } : null;
  // выполняем запрос
  model
    .findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt", "chatId"],
      },
      order: [["name", "ASC"]],
      limit: parseInt(limit) ? parseInt(limit) : null,
      offset: parseInt(offset) ? parseInt(offset) : null,
      where: where,
      include: include,
      // логирование запроса
      //logging: console.log
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

module.exports = (router, moduleName) => {
  router.post("/", checkMethod(post, moduleName));
  router.get("/", checkMethod(get, moduleName));
  router.put("/", checkMethod(put, moduleName));
  // С проверкой на авторизацию
  //router.delete("/", jwtCheck, checkMethod(del, moduleName));
  router.delete("/", checkMethod(del, moduleName));
};