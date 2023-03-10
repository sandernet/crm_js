const jwt = require("jsonwebtoken");


const models = require("../../db/models");
const { Op } = require("sequelize");
const { checkMethod } = require("../../utils");

// Авторизация по токену
const checkJWT = require("../../utils/jwtMiddleware");

let model = models.employee

// генерирование токенов
const tokenAuth = (user) => {
    let access = jwt.sign(
        { user: user },
        process.env.SECRET_TOKEN,
        { expiresIn: '1h' }
    );
    let refresh = jwt.sign(
        { user: user },
        process.env.SECRET_TOKEN,
        { expiresIn: '10h' }
    );
    return { access, refresh };
}

// Передаца токена акторизация
const getTest = (req, res) => {
    res.status(200).send("user auth ok")
}

// Плучение auth токена
const getAccessToken = (req, res) => {
    res.status(200).send(tokenAuth('sander'))
};

// Плучение refresh токена
const getAccessRefresh = (req, res) => {
    res.status(200).send(tokenAuth('sander'))
};


module.exports = (router, moduleName) => {

    router.get("/", checkMethod(getAccessToken, moduleName));
    router.get("/testAuth/", checkJWT, checkMethod(getTest, moduleName));

    // defaultHelpRouter(router, model);
    // defaultPutRouter(router, moduleName, model, null);
    // defaultPostRouter(router, moduleName, model, null);
    // defaultDeleteRouter(router, moduleName, model, null);
};

// const { search, id, limit, offset, ...other } = req.query;

// // указываем в каких полях нужно искать строку /model?search=<>
// const searchCaption = search
//     ? {
//         [Op.or]: [
//             { typeBarcodes: { [Op.like]: `%${search}%` } },
//             { barcode: { [Op.like]: `%${search}%` } },
//         ],
//     }
//     : null;

// // поиск по id /model?id=<>
// const searchId = id ? { id } : null;

// const where =
//     searchCaption || searchId ? { ...searchCaption, ...searchId } : null;

// // выполняем запрос
// model
//     .findAndCountAll({
//         attributes: {
//             exclude: ["createdAt", "updatedAt", "deletedAt"],
//         },
//         order: [["id", "ASC"]],
//         limit: parseInt(limit) ? parseInt(limit) : null,
//         offset: parseInt(offset) ? parseInt(offset) : null,
//         ...other,
//         where: where,
//     })
//     .then((data) => {
//         res.status(200).send(data);
//     });

