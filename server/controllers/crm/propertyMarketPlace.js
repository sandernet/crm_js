const models = require("../../db/models");
const { Op } = require("sequelize");
// const { axiosGet, axiosConfig } = require('../../controllers/moysklad/axiosConfig')
const axiosModule = require('axios')


let model = models.propertyMarketPlace

// Получение данных
const get = (req, res) => {
  const { search, id, limit, offset, ...other } = req.query;

  // указываем в каких полях нужно искать строку /model?search=<>
  const searchCaption = search
    ? {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { marketPlaceId: { [Op.like]: `%${search}%` } },
        { params: { [Op.like]: `%${search}%` } },
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


module.exports = {
  get,
  model
};