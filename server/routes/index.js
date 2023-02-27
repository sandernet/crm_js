const Router = require('express')
const router = new Router()

// Экспортируем файлы с роутами
const employeeRouter = require('./employeeRouter')
const productRouter = require('./productsRouter')
const wbRouter = require('./wildberriesRouter')



// Сопоставлям маршруты с роутами
// Сотрудники
router.use('/employee', employeeRouter)
// Товары
router.use('/product', productRouter)
// Вайлбериз
router.use('/wb', wbRouter)

module.exports = router