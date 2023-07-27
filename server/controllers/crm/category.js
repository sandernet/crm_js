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


const getCategoriesWithHierarchy = async () => {
  try {
    const categoriesWithHierarchy = await model.findAll({
      include: [
        {
          model: model,
          as: 'children',
          hierarchy: true, // Это опция позволяет установить иерархию
        },
      ],
      where: { parent_id: null }, // Получаем только корневые категории
    });

    return categoriesWithHierarchy;
  } catch (error) {
    console.error('Error while fetching categories with hierarchy:', error);
    throw error;
  }
};



// Получение данных
const getCategory = (req, res) => {
  res.status(200).send(getOneExternalCode(req.query));
}

module.exports = (router, moduleName) => {
  model = models[moduleName];

  router.get("/", checkMethod(getCategoriesWithHierarchy, moduleName));

  defaultPutRouter(router, moduleName, model, null);
  defaultPostRouter(router, moduleName, model, null);
  defaultDeleteRouter(router, moduleName, model, null);
};