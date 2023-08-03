const models = require("@models");
const { Op } = require("sequelize");

let model = models.productCategory

// Получение записи по id данных
const getURI = (req, res) => {
  const { id } = req.params;
  model.findOne({ where: { id: id } }).defAnswer(res);
};


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

module.exports = (router) => {
  router.get("/", get);
  router.get("/:id", getURI);
  return true
};