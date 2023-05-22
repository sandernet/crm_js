const { getIdFormUrl, axiosGet } = require('./config')
// функции получение времени посдедней синхронихации модуля
// Функция добовления времени синхронизации модуля
const { getSyncMaxData, addSyncInfo, lastUpdateDate, limitLoader } = require('./config')
// const { defaultGet } = require("../../utils/db");
const { getOneExternalCode } = require("../category");
const models = require("../../db/models");

let model = models.category

// Параметры запроса в мой склад
// Для получения всех категорий товаров
// params фильтры для запроса 
const config = (params) => {
    return {
        method: 'get',

        url: '/entity/productfolder',
        headers: {
            "Content-Type": "application/json"
        },
        params: {
            ...params
            // limit: 10,
            // offset: 0,
            // filter: "updated>=2023-03-13 21:43:42"
        },
    }
}

// Проверка наличия в в таблице записи 
// Вход: id из мой склад (externalCodeMS)
// Выход: запись из модели либо null

// Обновление всех категорий 
const syncCategoryMS = async () => {
    // Получаем из Мой склад  все категории с фильтром
    // createArrayAddCategory функция преобразовывает
    // запрос MS в массив для записи в модель категория
    try {
        const filterDateMS = lastUpdateDate === null ? { filter: "" } : { filter: await getSyncMaxData("categoryMS") }
        let params = { limit: limitLoader, offset: 0, ...filterDateMS }


        let check = true;
        let count = 0;
        do {

            let data = await axiosGet(config(params), createArrayAddCategory)
            // Проверяем получили ли входные данные
            if (data.data.length > 0) {
                // загружаем в базу и получем ответ
                const addCategoryDB = await bulkCreateData(data.data)
                count = addCategoryDB ? count + addCategoryDB?.length : count;

            }
            // Проверяем есть ли еще порция данных в МойСклад
            params.offset = params.offset + params.limit
            if (data.size < params.offset) {
                check = false
            }
        } while (check)
        addSyncInfo(`Обновлено ${count} категорий `, "categoryMS", 0)
    }
    catch {
        (error) => {
            addSyncInfo(error, "categoryMS", 1)
            throw new Error("Ошибка  загрузки категорий товаров");
        }
    }
}

// Процедура создания массива с данными для ввода в базу всех категорий 
const createArrayAddCategory = (msObj) => {

    // Вставить обработчик запросов с шагом 100 товаров
    let size = msObj.meta.size
    let limit = msObj.meta.limit

    let dataArrayCategory = [];
    for (let i of msObj['rows']) {
        dataArrayCategory.push({
            name: i.name,
            description: i.description ? i.description : null,
            externalCodeMS: i.id,
            parent_id: i.pathName !== '' ? getIdFormUrl(i.productFolder.meta.href) : null
        }
        )
    }
    return {
        data: dataArrayCategory,
        size: size,
        limit: limit,
    }
}

const checkCategory = async (idMS) => {
    // получем категории из базы по id из мой склад
    let category = await getOneExternalCode(idMS)
    // Если категория не найдена в базе обновляем весь каталог из мой склад
    if (category === null) {
        // получаем массив для создания в базе
        await syncCategoryMS()
        // messages = arrayAddCategory;
        // еще раз проверяем наличие в базе
        category = await getOneExternalCode(idMS)
    }
    //возвращаем объект с данными 
    return category
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
            //Указываем какие поля нужно обновить,
            updateOnDuplicate: ["name", "description", "parent_id"]
        }
    )
};

module.exports = {
    checkCategory
}