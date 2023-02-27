const Router = require('express')
const router = new Router()

// импортирум контролер (функции) и передаем их как объект без вызова без скобок
const msControllers = require('../controllers/moysklad/productMSController')
const priceController = require('../controllers/priceControlles')


router.get('/syncproductms', msControllers.syncProductsMS)
// Добавляем Вид цены в базу
router.post('/addtypeprice', priceController.addTypePrice)
// Добавление цены на товар
router.post('/addprice', priceController.addPrice)
// Получаем все цены товарв
router.get('/getallprice', priceController.getAllPrice)



module.exports = router