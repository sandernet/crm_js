const Router = require('express')
const router = new Router()

// импортирум контролер (функции) и передаем их как объект без вызова без скобок
const wildberriesController = require('../controllers/wildberries/wildberriesApi')


router.get('/wbsyncproduct', wildberriesController.syncProductsMS)


module.exports = router