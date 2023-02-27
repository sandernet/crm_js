// достаем параметры из файла конфигурации .env
const express = require("express");
// модуль загрузки файлов на сервер
const fileUpload = require("express-fileupload");
// Экспортируем модель
const cors =require('cors')

const def = () => {
    const app = express();
    app.use(cors()) // передаем в приложение Cors
    app.use(express.urlencoded({ extended: true }));
    // передаем модуль json что бы приложение могло парсить
    app.use(express.json());

    app.use(async (req, res, next) => {
        next();
    });
    app.use(
        fileUpload({
            useTempFiles: true,
            tempFileDir: "/tmp/",
        })
    )
    return app;
};

module.exports = def;