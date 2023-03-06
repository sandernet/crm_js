const models = require("../db/models");
const { checkMethod } = require("../utils");
const {
    defaultPostRouter,
    defaultDeleteRouter,
    defaultPutRouter,
    defaultHelpRouter,
} = require("../utils/db");

let model;

// Получаем все данные из модели
const get = async (req, res) => {
    res.status(200).send(
        await model.findAndCountAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
        })
    );
};

// Удаление 
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
    model = models[moduleName];

    router.get("/", checkMethod(get, moduleName));

    defaultHelpRouter(router, model);
    defaultPutRouter(router, moduleName, model, null);
    defaultPostRouter(router, moduleName, model, null);
    //router.delete("/", checkMethod(del, moduleName));
    defaultDeleteRouter(router, moduleName, model, null);
};
