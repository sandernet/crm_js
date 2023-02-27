// достаем параметры из файла конфигурации .env
require('dotenv').config()
const express = require('express')
const sequelize = require('./db')


// Экспортируем модель
const cors =require('cors')

// модуль загрузки файлов на сервер
const fileupload =require('express-fileupload')

//модуль работы с путями
const path = require('path')

// // импортируем роутеры
const router = require('./routes/index')

// // импортируем Middleware
// const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000


const app = express()
app.use(cors()) // передаем в приложение Cors

// передаем модуль json что бы приложение могло парсить
app.use(express.json())

// // добавляем отдачу содержимого папки static
// app.use(express.static(path.resolve(__dirname, 'static')))
//
// // Регистрируем модуль загрузки файлов
// app.use(fileupload({}))

// // регистрируем роутеры в программе
app.use('/api', router)


// // Middleware который работает с ошибками должен регистрироваться в конце
// app.use(errorHandler)


// функция запуска приложение
const start = async ()=> {
    try {
        await sequelize.authenticate() // подключение к базе данных


        // User.sync()- Это создает таблицу, если она не существует (и ничего не делает, если она уже существует)
        // await sequelize.sync({ force: true }) //- Это создает таблицу, сначала удаляя ее, если она уже существовала
        //await sequelize.sync({ alter: true }) //- Это проверяет, каково текущее состояние таблицы в базе данных
        // (какие столбцы в ней есть, каковы их типы данных и т. д.), а затем выполняет необходимые изменения в таблице,
        // чтобы она соответствовала модели.
        // Выполняем синхронизацию только тех моделей, названия которых заканчиваются на `_test`
        //await sequelize.sync({ force: true, match: /_test$/ })

        //await sequelize.sync() // синхронизация базы с программой, если были изменения

        // запуск приложения на указанном порту
        app.listen(PORT, () => console.log(`Start server ${PORT}`))
        // Запускаем приложение

    } catch (e){
        console.log(e) //  Если возникнет ошибка, то выводит сообщение об ошибке и саму ошибку
    }
}

start()

