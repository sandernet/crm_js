const { loggings } = require("@models");
const { Sequelize, Op } = require("sequelize");




// создание записи в таблицу логирования взаимодействия с  серверами API
const addSyncInfo = async (info, module, action, date, resultError) => {
    if (date === undefined) {
        date = new Date()
    }
    return await logging.create(
        {
            ...{
                info: info,
                module: module,
                action: action,
                resultError: resultError
            }, ...{ createdAt: date }
        }
    );
};

// Конвертирование даты в текущий часовой и в строку для запроса в МС
function convertTZ(date) {
    const toTZ = Intl.DateTimeFormat().resolvedOptions().timeZone; // Получаем текущий часовой пояс

    const options = {
        timeZone: 'europe/moscow',
        hour12: false
    };
    const toTime = new Date(date.toLocaleString('en-US', options));

    const formattedDateTime = `${toTime.getFullYear()}-${(toTime.getMonth() + 1).toString().padStart(2, '0')}-${toTime.getDate().toString().padStart(2, '0')} ${toTime.getHours().toString().padStart(2, '0')}:${toTime.getMinutes().toString().padStart(2, '0')}`;
    return formattedDateTime;
}

// Получение информации по последнему обновлению по модулю
// удачному resultError: 0 
// НЕ удачному resultError: 1 
const getSyncMaxData = async (module, action, resultError = 0, lastUpdateDate = null) => {
    if (lastUpdateDate === null) {
        return ""
    }

    const data = await loggings.findOne({
        where: {
            [Op.and]: [
                { module: module },
                { resultError: resultError },
                { action: action },
            ],
        },
        attributes: [
            [Sequelize.fn('max', Sequelize.col(`${loggings.name}.createdAt`)), 'm__createdAt'],
        ],
    })
    if (data === null || data.dataValues.m__createdAt === null) {
        return ""
    }
    let updatedAt = data.dataValues.m__createdAt;
    const dateString = convertTZ(updatedAt,); // Конвертируем дату в текущий часовой пояс и в нужный формат
    return { filter: `updated >= ${dateString}` }
};

module.exports = {
    getSyncMaxData,
    addSyncInfo

}
