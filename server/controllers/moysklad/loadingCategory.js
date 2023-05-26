const { axiosGet, axiosConfig } = require('./axiosConfig')
// функции получение времени посдедней синхронихации модуля
// Функция добовления времени синхронизации модуля
const { limitLoader, getIdFormUrl, moduleName } = require('./config')
const { getSyncMaxData, addSyncInfo } = require('./syncConfig')
// const { defaultGet } = require("../../utils/db");
const { getOneExternalCode } = require("../category");
const models = require("../../db/models");

// Модель данных Таблица
let model = models.category

// параметр API MC для получение категорий товаров
const url = '/entity/productfolder'


// Обновление всех категорий 
const syncCategoryMS = async () => {
    // Получаем из Мой склад  все категории с фильтром
    // createArrayAddCategory функция преобразовывает
    // запрос MS в массив для записи в модель категория
    let count = 0;
    try {
        const filterDateMS = await getSyncMaxData(moduleName, __filename)
        let params = { limit: limitLoader, offset: 0, ...filterDateMS }


        let check = true;
        do {

            let data = await axiosGet(axiosConfig({ url: url, params: params }), createArrayAddCategory)
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
        addSyncInfo(`Обработано ${count} категорий `, moduleName, __filename, 0)
    }
    catch {
        (error) => {
            console.log(`Зарос Не выполнен! ${error} // ${moduleName} // ${__filename}`)
            addSyncInfo(error, moduleName, __filename, 1)
            throw new Error("Ошибка  загрузки категорий товаров");
        }
    } finally {
        return count
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

const getCategory = async (idMS) => {
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
// Получение Товаров из мой склад
const loadingCategory = async (req, res) => {
    const startDateTime = new Date();
    console.log(`${startDateTime} - Время запуска обмена.`)

    const countCategory = await syncCategoryMS();
    const finishDateTime = new Date();
    console.log(`${finishDateTime} Обработано ${countCategory} категорий // ${moduleName} // ${__filename}`)
    res.status(200).send({ mes: `Зарос выполнен! / Обработано ${countCategory} категорий` })
}

module.exports = {
    loadingCategory,
    getCategory
}