const models = require("../../db/models");
const { Sequelize, Op } = require("sequelize");
const moment = require("moment");



let model = models.syncInfo

// создание записи в таблицу логирования взаимодействия с  серверами API
const addSyncInfo = async (info, module, resultError) => {
    return await model.create(
        {
            info: info,
            module: module,
            resultError: resultError
        });
};


// Плучение информации по последнему обновлению по модулю
// удачному resultError: 0 
// НЕ удачному resultError: 1 
const getInfoMaxData = async (module, resultError = 0) => {
    const data = await model.findOne({
        where: {
            [Op.and]: [
                { module: module },
                { resultError: resultError },
            ],
        },
        attributes: [
            [Sequelize.fn('max', Sequelize.col(`${model.name}.createdAt`)), 'm__createdAt'],
            // include: [
            //     [Sequelize.fn('max', Sequelize.col(`${model.name}.createdAt`)), 'm__createdAt'],

            // ]
        ],
        // group: [`${model.name}.module`],
        // order: Sequelize.literal(`${model.name}.createdAt`)
    })
    if (data === null || data.dataValues.m__createdAt === null) {
        return null
    }


    let updatedAt = data.dataValues.m__createdAt;
    const dateString = moment.utc(updatedAt).format("YYYY-MM-DD HH:mm")

    // return toUTCString(data.dataValues.updatedAt)
    console.log(dateString);

    return dateString
};

function formatDate(date) {
    return date.getFullYear() + '-' +
        (date.getMonth() + 1) + '-' +
        date.getDate() + ' ' +
        date.getHours() + ':' +
        date.getMinutes();
}

module.exports = {
    getInfoMaxData,
    addSyncInfo

}
