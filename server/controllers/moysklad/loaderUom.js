const { getIdFormUrl, axiosGet } = require('./config')
// функции получение времени посдедней синхронихации модуля
// Функция добовления времени синхронизации модуля
const { getInfoMaxData, addSyncInfo } = require('./config')
const { defaultGet } = require("../../utils/db");
const models = require("../../db/models");

let model = models.uom

// Параметры запроса в мой склад
// Для получения всех категорий товаров
// params фильтры для запроса 
// {filter: "updated>=2023-03-13 21:43:42"}
// Получим 
// ?filter=updated>=2023-03-13 21:43:42', по дате 
const config = (params) => {
    return {
        method: 'get',
        // Добавляем фильтры ?filter=updated>=2023-03-13 21:43:42',
        params: params,
        url: '/entity/uom',
        headers: {
            "Content-Type": "application/json"
        },
    }
}

// Проверка наличи в моделе записи 
// Вход: id из мой склад (externalCodeMS)
// Выход: запись из модели либо null
const getRecordFromModel = async (idMS) => {
    return await defaultGet({ externalCodeMS: idMS }, model)
}

// Обновление всех записей
const getUom = async (filter) => {
    // Получаем из Мой склад  все Ед. изм с фильтром 
    // creatArrayAddUom функция преобразовывает 
    // запрос MS в массив для записи в модель категоря
    let uomMS = await axiosGet(config(filter), creatArrayAddUom)
    // Проверяем получили ли входные данные
    if (uomMS.length > 0) {
        // загружаем в базу и получем ответ
        const addDataDB = await bulkCreateData(uomMS)
        if (addDataDB) {
            const mes = `Обновлено ${addDataDB.length} записпей в таблице ${model.name}`;
            await addSyncInfo(mes, "uomMS", 0)
            return mes
        }
    }
    else {
        const mes = `Что то пошло не так данные не добавлены`;
        await addSyncInfo(mes, "uomMS", 1)
        return mes;
    }
}


// Прощедура создания массива с данными для ввода в базу 
const creatArrayAddUom = (data) => {
    let dataArrayCat = [];
    for (let i of data['rows']) {
        dataArrayCat.push({
            name: i.name,
            description: i.description ? i.description : null,
            externalCodeMS: i.id,
            code: i.code !== '' ? i.code : null
        }
        )
    }
    return dataArrayCat
}

const checkUom = async (idMS) => {
    let messages = {}
    let arrayAddData = null;
    // получем категории из мой склад по id из мой склад
    let uom = await getRecordFromModel(idMS)
    // Если категория не найдена в базе обновляем весь каталог из мой склад
    if (uom === null) {
        // Устанавливаем фильтр запроса к мой склад
        const lastUpdateDate = await getInfoMaxData("uomMS")
        let filterMS = lastUpdateDate === null ? { filter: "" } : { filter: `updated>=${lastUpdateDate}` }

        // получаем массив для создания в базе
        arrayAddData = await getUom(filterMS)
        // messages = arrayAddCategory;
        // еще раз проверяем наличие в базе
        uom = await getRecordFromModel(idMS)
        if (uom === null) {
            // если нету возращаем объект с сообщением и ощибкой 
            return messages = {
                all: arrayAddData,
                messages: 'Ед. измерения нету в базе {Херня какая-то !!!',
                uomId: null,
                isError: true
            };
        }
    }
    //возращаем объект с данными 
    return messages = {
        all: arrayAddData,
        messages: 'Ед. измерения найдена',
        uomId: uom.id,
        isError: false

    };

}

/* 
Массовое добавление данных в таблицу
bulkCreate: updateOnDuplicate
*/
const bulkCreateData = (dataArray) => {
    // dataArray = [{
    //     name: "Наименование 1112",
    //     externalCodeMS: "Внешний код 111",
    //     description: "Описание 1112",
    //     parent_id: "Внешний код 222 родительского"
    // },
    // {
    //     name: "Наименование 2223",
    //     externalCodeMS: "Внешний код 222",
    //     description: "Описание  2223",
    //     parent_id: "Внешний код 222 родительского"
    // }]
    return model.bulkCreate(
        dataArray
        , {
            //fields: ["externalCodeMS"],
            updateOnDuplicate: ["name", "description", "code"]
        }
    )
};

module.exports = {
    checkUom
}