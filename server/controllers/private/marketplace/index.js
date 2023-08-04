const { Op } = require("sequelize");
const models = require("@models");
const { checkVal } = require("@utils");


let model = models.marketplace

const getURI = (req, res) => {
    const { id } = req.params;
    model.findOne({ where: { id: id } }).defAnswer(res);
};

// Получение данных
const get = (req, res) => {
    const { search, id, limit, offset, ...other } = req.query;
    // указываем в каких полях нужно искать строку /product?search=<>
    const searchCaption = search
        ? {
            [Op.or]: [
                { name: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } },
            ],
        }
        : null;
    // поиск по id /?id=<>
    const searchId = id ? { id } : null;

    const where =
        searchCaption || searchId ? { ...searchCaption, ...searchId } : null;
    // выполняем запрос
    model
        .findAndCountAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
            order: [["name", "ASC"]],
            limit: parseInt(limit) ? parseInt(limit) : null,
            offset: parseInt(offset) ? parseInt(offset) : null,
            where: where,
            // логирование запроса
            // logging: console.log
        })
        .defAnswer(res);
};

const update = (req, res) => {
    const { id, ...other } = req.body;

    model.update(other, { where: { id } }).defAnswer(res);
};

module.exports = (router) => {
    router.get("/", get);
    router.get("/:id", getURI);
    router.put("/", checkVal(["id"], "body"), update);
    return true;
};