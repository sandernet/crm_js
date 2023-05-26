// достаем параметры из файла конфигурации .env
require("dotenv").config();

const { Router } = require("express");
const app = require("./config/express")();
const { loader } = require("./utils");
// Авторизация по токену
const checkJWT = require("./utils/jwtMiddleware");

const PORT = process.env.PORT || 5000

// загрузка контроллера в авторизации
// { path: "./controllers/auth", type: "authentication" },
loader(
    { path: "./controllers/auth", type: "authentication" },
    checkJWT,
    () => {
        const router = Router();
        app.use(`/api/profile/`, router);
        return router;
    }
);

//  { path: "./routers", type: "routers" },
loader(
    { path: "./routers/crm", type: "crm" },
    checkJWT,
    (moduleName) => {
        const router = Router();
        app.use(`/api/${moduleName}`, router);
        return router;
    }
);


// мой склад
// загружаем роутеры из модуля мой склад
loader(
    { path: "./routers/moysklad", type: "moysklad", exclude: ["index.js"] },
    checkJWT,
    () => {
        const router = Router();
        app.use(`/api/moysklad/`, router);
        return router;
    }
);


//  { path: "./routers", type: "routers" },
loader(
    { path: "./routers/avito", type: "avito", exclude: ["index.js"] },
    checkJWT,
    () => {
        const router = Router();
        app.use(`/api/avito/`, router);
        return router;
    }
);



app.listen(PORT, () => console.log(`Start server ${PORT}`));

