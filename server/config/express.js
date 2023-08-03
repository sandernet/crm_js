// достаем параметры из файла конфигурации .env
const express = require("express");
const wsServer = require("../wsServer");
const controllers = require("../controllers");
// модуль загрузки файлов на сервер
const fileUpload = require("express-fileupload");
// Экспортируем модель
const cors = require('cors')

const def = () => {
    const app = express();

    if (typeof wsServer === "function") {
        wsServer(app);
    }

    app.use(cors()) // передаем в приложение Cors
    app.use(express.urlencoded({ extended: true }));
    // передаем модуль json что бы приложение могло принимать json
    app.use(express.json());

    // загрузка контроллеров private
    if (Array.isArray(controllers.private)) {
        controllers.private.forEach((item) => {
            if (item.name && item.router) {
                app.use(item.name, item.router);
            }
        });
    } else {
        console.log("controllers private not correct");
    }

    // загрузка контроллеров public
    if (Array.isArray(controllers.public)) {
        controllers.public.forEach((item) => {
            if (item.name && item.router) {
                app.use(item.name, item.router);
            }
        });
    }

    // путь для файлов загрузки
    app.use(
        fileUpload({
            createParentPath: true,
            defParamCharset: "utf-8",
            // useTempFiles: true,
            // tempFileDir: "/tmp/",
        })
    )
    return app;
};

module.exports = def;