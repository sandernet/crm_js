const Router = require('express')
const router = new Router()

// импортирум контролер (функции) и передаем их как объект без вызова без скобок
const employeeController = require('../controllers/employeeController')

// импортируем Middleware (аворизации по токену)
// const authMiddleware = require('../middleware/authMiddleware')

// регистрация
router.get('/syncemployeems', employeeController.syncEmployeeMS)

// // Авторизация
// router.post('/login', employeeController.login)
//
// // Проверка авторизован пользователь или нет (Вторым пораметром передаем функцию проверки авторизации)
// router.get('/auth', authMiddleware, employeeController.check)

module.exports = router