const models = require("../../db/models");
const { checkMethod } = require("../../utils");
// const axiosModule = require('axios')


const { moduleName } = require("./config/config")

const { addOrUpdateRecord } = require("../../utils/db");


// логирование загрузки данных
const { addSyncInfo } = require('../logging/syncLogging')

let model = models.propertyMarketPlace


const property = async (req, res) => {
    try {
        const { marketPlace = 1 } = req.query
        // поиск по id /product?id=<>
        const searchId = marketPlace ? { marketPlaceId: marketPlace } : null;
        const where =
            searchId ? searchId : null;
        const propertyMP = await model
            .findAndCountAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                order: [["requiredField", "DESC"], ["id", "ASC"]],
                where: where,
            })
        res.status(200).send(propertyMP);
    } catch (error) {
        console.log(`${new Date()} Обработано ${null} товаров // ${moduleName} // ${__filename}`)
        // addSyncInfo(`${error}`, moduleName, __filename, new Date(), 1)
        res.status(200).send({ isError: 'Ошибка получения данных' });

    }
}

module.exports = (router, moduleName) => {
    router.get("/", checkMethod(property, moduleName));
}