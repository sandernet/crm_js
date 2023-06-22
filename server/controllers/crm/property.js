const models = require("../../db/models");
const { Op } = require("sequelize");
// const { axiosGet, axiosConfig } = require('../../controllers/moysklad/axiosConfig')
const axiosModule = require('axios')


const { checkMethod } = require("../../utils");

let model = models.property
let modelMP = models.propertyMarketPlace

// Получение данных
const get = async (req, res) => {
  try {
    const marketPlace = 1
    // const { search, id, limit, offset, ...other } = req.query;

    // // указываем в каких полях нужно искать строку /model?search=<>
    // const searchCaption = search
    //   ? {
    //     [Op.or]: [
    //       { name: { [Op.like]: `%${search}%` } },
    //       { marketPlaceId: { [Op.like]: `%${search}%` } },
    //       { params: { [Op.like]: `%${search}%` } },
    //     ],
    //   }
    //   : null;

    // // поиск по id /model?id=<>
    // const searchId = id ? { id } : null;

    // const where =
    //   searchCaption || searchId ? { ...searchCaption, ...searchId } : null;
    // выполняем запрос
    await model
      .findAndCountAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        include: [{
          model: modelMP,
          as: 'propertyMP',
          where: { marketPlaceId: marketPlace },
          attributes: {
            // Исключить поля field3 и field4 из модели 2
            exclude: ["createdAt", "updatedAt", "deletedAt"]
          }
        }],
        // order: [["id", "ASC"]],
        // limit: parseInt(limit) ? parseInt(limit) : null,
        // offset: parseInt(offset) ? parseInt(offset) : null,
        // ...other,
        // where: where,
      })
      .then((data) => {
        res.status(200).send(data);
      });
  } catch (error) {
    console.log(error)
    res.status(200).send(error);
  }
};



module.exports = (router, moduleName) => {
  // router.post("/", checkMethod(post, moduleName));
  router.get("/", checkMethod(get, moduleName));
  // router.put("/", checkMethod(put, moduleName));
  // // С проверкой на авторизацию
  // //router.delete("/", jwtCheck, checkMethod(del, moduleName));
  // router.delete("/", checkMethod(del, moduleName));
};