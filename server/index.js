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

app.listen(PORT, () => console.log(`Start server, port: ${PORT}`));