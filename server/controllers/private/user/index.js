const { Op } = require("sequelize");
const { user, userRole } = require("@models");
const { checkVal } = require("@utils");

const getURI = (req, res) => {
    const { id } = req.params;
    user.findOne({ where: { id: id } }).defAnswer(res);
};

const get = (req, res) => {
    const { search, limit, offset } = req.query;

    const where = search ? { name: { [Op.getLike()]: `%${search}%` } } : null;

    user
        .findAndCountAll({
            where,
            ...(limit ? { limit } : {}),
            ...(offset ? { offset } : {}),
        })
        .then(async (data) => {
            const userRoleData = await userRole.findAll({
                where: { userId: data.rows.map((item) => item.id) },
            });

            return {
                count: data.count,
                rows: data.rows.map((item) => {
                    return {
                        ...item.toJSON(),
                        userRoles: userRoleData.find((role) => role.userId === item.id),
                    };
                }),
            };
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