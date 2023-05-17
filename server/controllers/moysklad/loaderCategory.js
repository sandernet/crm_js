const { getIdFormUrl, axiosGet } = require('./config')
// функции получение времени посдедней синхронихации модуля
// Функция добовления времени синхронизации модуля
const { getInfoMaxData, addSyncInfo, lastUpdateDate, limitLoader } = require('./config')
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
            // ...filter
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
        const filterDateMS = lastUpdateDate === null ? { filter: "" } : { filter: await getInfoMaxData("categoryMS") }
        let params = { limit: limitLoader, offset: 0, ...filterDateMS }

        let categoryMS = await axiosGet(config(params), createArrayAddCategory)
        // Проверяем получили ли входные данные
        if (categoryMS.length > 0) {
            // загружаем в базу и получем ответ
            const addCategoryDB = await bulkCreateData(categoryMS)
            if (addCategoryDB) {
                const mes = `Обновлено ${addCategoryDB.length} категорий`;
                await addSyncInfo(mes, "categoryMS", 0)
                return mes
            }
        }
    }
    catch {
        const mes = `Что то пошло не так категории не обновлены`;
        await addSyncInfo(mes, "categoryMS", 1)
        return mes;
    }
}

// Процедура создания массива с данными для ввода в базу всех категорий 
const createArrayAddCategory = (data) => {
    let dataArrayCategory = [];
    for (let i of data['rows']) {
        dataArrayCategory.push({
            name: i.name,
            description: i.description ? i.description : null,
            externalCodeMS: i.id,
            parent_id: i.pathName !== '' ? getIdFormUrl(i.productFolder.meta.href) : null
        }
        )
    }
    return dataArrayCategory
}

const checkCategory = async (idMS) => {
    let messages = "";
    // получем категории из базы по id из мой склад
    let category = await getOneExternalCode(idMS)
    // Если категория не найдена в базе обновляем весь каталог из мой склад
    if (category === null) {
        // получаем массив для создания в базе
        messages = await syncCategoryMS()
        // messages = arrayAddCategory;
        // еще раз проверяем наличие в базе
        category = await getOneExternalCode(idMS)
    }
    //возвращаем объект с данными 
    return {
        messages: messages,
        categoryId: category.id,
        isError: false
    };
}


/**************************************** 
 * Рекурсия перебор всех подгрупп
*/
const updateCategory = async () => {

    // получаем массив из мой склад 
    //и с помощью функции фильтр формируем массив для загрузки
    let category = await axiosGet(config(), filterCat)
    await bulkCreate(category)
    // рекурсия загрузки категорий
    //    let category = await axiosGet(config, creatCategory)

    /*
    if (!category) {
        return messages.push({ messages: 'Rfr' })
    }

    console.log(category.x.productFolder.meta.href)
    console.log(category.x.pathName)
    await getCategory(category.x.productFolder.meta.href, category.x.pathName)
    */

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
            updateOnDuplicate: ["name", "description", "parent_id"]
        }
    )
};

module.exports = {
    checkCategory
}





// while (foundPos > 0) {
//     foundPos = pathName.indexOf('/', pos);
//     categoryName = (foundPos == -1) ? pathName.slice(pos) : pathName.slice(pos, foundPos)

//     // Ищем в базе категорию
//     foundCategory = await categoryController.getSearchCategories(categoryName)

//     if (foundPos == -1) {
//         // и это конечная категория
//         if (foundCategory != null) {
//             //если находим, то возращаем найденую
//             return foundCategory
//         } else {
//             //если НЕ находим, и это конечная категория то создаем и возращаем её
//             return await categoryController.addCategory({
//                 category: categoryName,
//                 description: '',
//                 parent_id: parent_id
//             })
//         }
//     } else {
//         if (foundCategory != null) {
//             //если находим, то возращаем найденую
//             parent_id = foundCategory.id
//         } else {
//             //если НЕ находим, и это конечная категория то создаем и возращаем её
//             foundCategory = await categoryController.addCategory({
//                 category: categoryName,
//                 description: '',
//                 parent_id: parent_id
//             })
//             parent_id = foundCategory.id
//         }
//     }
//     pos = (foundPos == -1) ? pos : foundPos + 1; // продолжаем со следующей позиции
// }