const models = require("@models");
const { checkMethod } = require("@utils");
// const axiosModule = require('axios')


const { moduleName } = require("./config/config")

const { addOrUpdateRecord } = require("@utils/db");


// логирование загрузки данных
const { addSyncInfo } = require('../logging/syncLogging')

let modelPropertyMP = models.propertyMarketPlace
let modelProperty = models.property


const include = (product) => {
    return {
        model: modelProperty,
        as: 'property',
        // указываем что это левое соединение 
        required: false,
        where: { "productId": product },
        attributes: {
            // Исключить поля field3 и field4 из модели 2
            exclude: ["createdAt", "updatedAt", "deletedAt"]
        }
    };
}
const property = async (req, res) => {
    try {
        const { marketPlace, product } = req.query
        console.log(marketPlace, product)
        // поиск по id /product?id=<>
        const searchId = marketPlace ? { marketPlaceId: marketPlace } : null;
        const where =
            searchId ? searchId : null;
        const propertyMP = await modelPropertyMP
            .findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                order: [["requiredField", "DESC"], ["id", "ASC"]],
                where: where,
                include: include(product),
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