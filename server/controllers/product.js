const models = require("../db/models");
const { checkMethod } = require("../utils");
const {
    defaultPostRouter,
    defaultDeleteRouter,
    defaultPutRouter,
    defaultHelpRouter,
} = require("../utils/db");

let model;

const get = async (req, res) => {
    res.status(200).send(
        await model.findAndCountAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
        })
    );
};

module.exports = (router, moduleName) => {
    model = models[moduleName];

    router.get("/", checkMethod(get, moduleName));

    defaultHelpRouter(router, model);
    defaultPutRouter(router, moduleName, model, null);
    defaultPostRouter(router, moduleName, model, null);
    defaultDeleteRouter(router, moduleName, model, null);
};
