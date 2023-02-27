// const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const {Employee} = require('../models/models')
const ms = require('./moysklad/employeeMSController')


class EmployeeController {
    // функция Импортирования пользователей из мой склад
    // Сопостовление по externalCode внешний код CRM
    //  и id товарв в мой склад

    // Нужно ЕЩЕ подучать из параметра запроса
    // Дату и время прошлой синхронизации
    // Интервал с которым будет синхронизироваться

    async syncEmployeeMS(req, res) {
        const msObj = await ms.getEmployee() // получам данные из мой склад
        let sumInsert = 0 // количетво созданных пользователей
        for (let i of msObj['rows']) {
            // Проверяем есть ли такой пользователя в базе
            const candidate = await Employee.findOne({where: {externalCode:i.id}})
            if (!candidate) { // если есть не создаем
                sumInsert = sumInsert+1
                // Хешируем пароль
                // хешируем пароль пользователя
                const hashPassword = await bcrypt.hash(process.env.TEMPORARY_PASSWORD, 5)

                await Employee.create(
                    {
                        externalCode: i.id,
                        fullName: i.fullName, // полное имя
                        name: i.name, // имя
                        phone: i.phone,
                        position: i.position, // должность
                        archived: Boolean(i.archived), // архивный
                        password: hashPassword // генерация пароля
                    }
                ) // создаем пользователя в базе
            }
        }
        res.statusCode = 200
        return res.json({message: 'Созданных пользователей '+sumInsert})
    }

    // // функция авторизации пользователя
    // async login(req, res, next) {
    //     const {email, password} = req.body
    //     const user = await User.findOne({where: {email}})
    //     if (!user) {
    //         return next(ApiError.internal('пользователь не найден'))
    //     }
    //
    //     // Проверяем введенный пароль и пароль в базе данных (пароли хешированые)
    //     let comparePassword = bcrypt.compareSync(password, user.password) // сравниваем
    //     if (!comparePassword) {
    //         return next(ApiError.internal('Указан не верный пароль'))
    //     }
    //
    //     const token = generateJwt(user.id, user.email, user.role) // генерируем JWT пользователю
    //     return res.json({token}) // возращаем токен пользователю
    // }
    //
    // // функция проверки залогинен или нет
    // async check(req, res, next) {
    //     const token = generateJwt(req.user.id, req.user.email, req.user.role) // генерируем JWT пользователю
    //     return res.json({token})
    //
    // }
}

// Импортируем как новый объект
module.exports = new EmployeeController()