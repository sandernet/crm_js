const { Op } = require("sequelize");
const models = require("@models");
const { checkVal } = require("@utils");


const model = models.tradeOffer

const getURI = (req, res) => {
    const { id } = req.params;
    model.findOne({ where: { id: id } }).defAnswer(res);
};

// Получение данных
const getAll = (req, res) => {
    // const { search, id, limit, offset, ...other } = req.query;
    console.log(req)
    console.log('--++--++--++--')
    model.findOne({ where: { id: 2 } }).defAnswer(res);
    // выполняем запрос
    // model
    //     .findAndCountAll({
    //         attributes: {
    //             exclude: ["createdAt", "updatedAt", "deletedAt"],
    //         },
    //         order: [["name", "ASC"]],
    //         limit: parseInt(limit) ? parseInt(limit) : null,
    //         offset: parseInt(offset) ? parseInt(offset) : null,
    //         where: where,
    //         // логирование запроса
    //         logging: console.log
    //     }).then((data) => {
    //         console.log(data)
    //     }
    //     ).defAnswer(res);
};

// // Создание записи
// const post = (req, res) => {
//     const { ...other } = req.body;
//     model.create(other).defAnswer(res);
// };

// // Обновление записи 
// const put = (req, res, promiseError) => {
//     const { id, ...body } = req.body;

//     if (!id) {
//         throw new Error("Not found id in body");
//     }

//     model
//         .update(body, { where: { id: id } })
//         .then(() => {
//             model
//                 .findOne({
//                     where: { id: id },
//                     attributes: {
//                         exclude: ["createdAt", "updatedAt", "deletedAt"],
//                     },
//                 })
//                 .then((data) => {
//                     res.status(200).send(data);
//                 })
//                 .catch(promiseError);
//         })
//         .catch(promiseError);
// };
// // Удаление данных из Таблицы по id
// const del = (req, res, promiseError) => {
//     const { id } = req.body;

//     if (!id) {
//         throw new Error("Not found id in body");
//     }

//     model
//         .destroy({ where: { id } })
//         .then(() => {
//             res.status(200).send({ id, message: "deleted" });
//         })
//         .catch(promiseError);
// };

module.exports = (router) => {

    router.get("/", getAll);
    router.get("/:id", getURI);
    // router.post("/", post);
    // router.put("/", put);
    // router.delete("/", del);
    return true;
};