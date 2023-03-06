// достаем параметры из файла конфигурации .env
require("dotenv").config();

const { Router } = require("express");
const app = require("./config/express")();
const { loader } = require("./utils");
// Авторизация по токену
const checkJWT = require("./utils/jwtMiddleware");

const PORT = process.env.PORT || 5000


// загрузка контроллеров
loader(
    { path: "./controllers", type: "controller" },
    checkJWT,
    (moduleName) => {
        const router = Router();
        app.use(`/api/${moduleName}`, router);
        return router;
    }
);

app.listen(PORT, () => console.log(`Start server ${PORT}`));


// // Экспортируем модель
// const cors =require('cors')

// // передаем модуль json что бы приложение могло парсить
// app.use(express.json())
//
// // // добавляем отдачу содержимого папки static
// // app.use(express.static(path.resolve(__dirname, 'static')))

// // // Middleware который работает с ошибками должен регистрироваться в конце
// // app.use(errorHandler)
