// достаем параметры из файла конфигурации .env
require("dotenv").config();

const { Router } = require("express");
const app = require("./config/express")();
const { loader } = require("./utils");
// Авторизация по токену
const checkJWT = require("./utils/jwtMiddleware");


const PORT = process.env.PORT || 5000



// загрузка контроллера ваторизации
loader(
    { path: "./controllers/auth", type: "authentication" },
    checkJWT,
    () => {
        const router = Router();
        app.use(`/profile/`, router);
        return router;
    }
);


loader(
    { path: "./controllers", type: "controller" },
    checkJWT,
    (moduleName) => {
        const router = Router();
        app.use(`/api/${moduleName}`, router);
        return router;
    }
);

// мой склад
loader(
    { path: "./controllers/moysklad", type: "loaderProduct" },
    checkJWT,
    () => {
        const router = Router();
        app.use(`/moysklad/`, router);
        return router;
    }
);


app.listen(PORT, () => console.log(`Start server ${PORT}`));

