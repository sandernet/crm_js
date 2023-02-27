const {TypePrice, Price, Product} = require("../models/models");
const {Sequelize} = require('sequelize')

class PriceController {
    // поиск всех цен на товары
    async getAllPrice(req, res) {
        const {productId} = req.body // достаем из тела запроса диструктуризацию массива
        console.log(productId)
        const allPrice = await Price.findAll({
            where: {
                productId: productId,
            },
            attributes: {
                include: [
                    [Sequelize.fn('max', Sequelize.col("price.updatedAt")), 'm__updatedAt']
                ]
            },
            include: [{
                model: Product,
                required: true
            }],
            group: ['typepriceTitle'],
        })
        return res.json(allPrice)
    }

    // добавляет вид цены в таблицу;
    // POST Получаем данные в формате JSON
    async addTypePrice(req, res) {
        const {title} = req.body // достаем из тела запроса диструктуризацию массива
        const addTypePrice = await TypePrice.create({title}) // создаем запись в таблице и получаем её
        return res.json(addTypePrice) // возращаем запись
    }

    // добавляет новую цену на товар;
    // POST Получаем данные в формате JSON
    async addPrice(req, res) {
        const {price, productId, typepriceTitle} = req.body // достаем из тела запроса диструктуризацию массива
        const addPrice = await Price.create({price, productId, typepriceTitle}) // создаем запись в таблице и получаем её
        return res.json(addPrice) // возращаем запись
    }
}


// Импортируем как новый объект
module.exports = new PriceController()