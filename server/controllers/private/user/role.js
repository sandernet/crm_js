const { Op } = require("sequelize");
const { user } = require("@models");
const { checkVal } = require("@utils");

const getURI = (req, res) => {
    const { id } = req.params;
    user.findOne({ where: { id } }).defAnswer(res);
};

const get = (req, res) => {
    const { search, limit, offset } = req.query;

    const where = search ? { caption: { [Op.getLike()]: `%${search}%` } } : null;

    user
        .findAndCountAll({
            where,
            ...(limit ? { limit } : {}),
            ...(offset ? { offset } : {}),
        })
        .defAnswer(res);
};

const update = (req, res) => {
    const { id, ...other } = req.body;
    user.update(other, { where: { id } }).defAnswer(res);
};

module.exports = (router) => {
    router.get("/", get);
    router.get("/:id", getURI);

    router.put("/", checkVal(["id"], "body"), update);

    return true;
};