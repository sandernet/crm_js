const { product, productImages, price } = require("@models"); //require("../../db/models");
const { Op } = require("sequelize");

const getURI = (req, res) => {
  const { id } = req.params;
  product.findOne({ where: { id } }).defAnswer(res);
};

// Получение данных
const get = (req, res) => {
  const { search, id, limit, offset, category, ...other } = req.query;
  console.log(limit, offset);

  const productCategoryId = category == undefined ? { productCategoryId: { [Op.is]: null } } : {
    productCategoryId: { [Op.eq]: Number(category) }
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

  // поиск по id /?id=<>
  const searchId = id ? { id } : null;

  const where =
    searchCaption || searchId || productCategoryId ? { ...searchCaption, ...searchId, ...productCategoryId } : null;
  // выполняем запрос
  product
    .findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt", "chatId"],
      },
      order: [["name", "ASC"]],
      limit: parseInt(limit) ? parseInt(limit) : null,
      offset: parseInt(offset) ? parseInt(offset) : null,
      where: where,
      // логирование запроса
      //logging: console.log
    })
    .then(async (data) => {
      const productImagesData = await productImages.findAll({
        where: { productId: data.rows.map((item) => item.id) },
      })
      const productPrice = await price.findAll({
        where: { productId: data.rows.map((item) => item.id) },
      })

      return {
        count: data.count,
        rows: data.rows.map((item) => {
          return {
            ...item.toJSON(),
            images: productImagesData.filter((images) => images.productId === item.id),
            price: productPrice.filter((price) => price.productId === item.id)
          }

        })
      }
    }).defAnswer(res);
};
// Создание записи
const post = (req, res, promiseError) => {
  product
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

  product
    .update(body, { where: { id: id } })
    .then(() => {
      product
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

  product
    .destroy({ where: { id } })
    .then(() => {
      res.status(200).send({ id, message: "deleted" });
    })
    .catch(promiseError);
};

module.exports = (router) => {
  router.post("/", post);
  router.get("/", get);
  router.get("/:id", getURI);
  router.put("/", put);
  router.delete("/", del);
  return true;
};