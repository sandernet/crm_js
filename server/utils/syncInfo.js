const models = require("../db/models");
const { Sequelize, Op } = require("sequelize");



let model = models.syncInfo

// Плучение информации по последнему удачному обновлению по модулю
const addSyncInfo = async (info, module, resultError) => {
    await model.create(
        {
            info: info,
            module: module,
            resultError: resultError
        });
};

// Плучение информации по последнему удачному обновлению по модулю
const getInfoMaxData = async (module) => {
    const data = await model.findOne({
        where: {
            [Op.and]: [
                { module: module },
                { resultError: 0 },
            ],
        },
        attributes: {
            include: [
                [Sequelize.fn('max', Sequelize.col(`${model.name}.updatedAt`)), 'm__updatedAt']
            ]
        }
    })
    if (data.dataValues.updatedAt === null) {
        return null
    }
    let updatedAt = data.dataValues.updatedAt;
    const dateString = `${updatedAt.getFullYear().toString().slice(-4)}-${(
        "0" + (updatedAt.getMonth() + 1)).slice(-2)}-${(
            "0" + updatedAt.getDate()).slice(-2)} ${(
                "0" + updatedAt.getHours()).slice(-2)}:${(
                    "0" + updatedAt.getMinutes()).slice(-2)}`;



    // return toUTCString(data.dataValues.updatedAt)
    return dateString
};

module.exports = {
    getInfoMaxData,
    addSyncInfo

}
