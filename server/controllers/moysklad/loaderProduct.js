// подгружаем настроенный axios
const { axiosGet, getIdFormUrl } = require('./config')

// функции получение времени последней синхронизации модуля
// Функция добавления времени синхронизации модуля
const { getInfoMaxData, addSyncInfo, lastUpdateDate, limitLoader } = require('./config')

const { checkCategory } = require("./loaderCategory")
const { checkUom } = require("./loaderUom")

const models = require("../../db/models");

let model = models.product

// Параметры запроса в мой склад
const config = (params) => {
    return {
        method: 'get',

        url: '/entity/product',
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

// Обновление всех записей
const getProductDB = async (addDataDB) => {
    if (addDataDB.length > 0) {
        // загружаем в базу и получем ответ
        const detDataDB = await bulkCreateData(addDataDB)
        if (detDataDB) {
            const mes = `Обновлено ${detDataDB.length} товаров`;
            await addSyncInfo(mes, "productMS", 0)
            return mes
        }
    }
    else {
        const mes = `Обновлено 0 товаров`;
        await addSyncInfo(mes, "productMS", 1)
        return mes;
    }
}

/* 
Массовое добавление данных в таблицу
bulkCreate: updateOnDuplicate
*/
const bulkCreateData = (dataArray) => {
    return model.bulkCreate(
        dataArray
    )
};

// обработчик данных
const processingData = async (msObj) => {
    let product = [];
    let items = {}

    // Вставить обработчик запросов с шагом 100 товаров
    let size = msObj.meta.size
    let limit = msObj.meta.limit

    for (let i of msObj['rows']) {

        items.idMS = i.id
        items.name = i.name
        items.article = i.article

        // получаем id категории если категория есть в базе 
        // если нету загружаем все категории"
        if (i.pathName !== '') {
            const category = await checkCategory(getIdFormUrl(i.productFolder.meta.href))
            items.categoryId = category.isError === false ? category.categoryId : null
        }

        items.property = {
            externalCode: i.externalCode,
            description: i.description,
            weight: i.weight,
            volume: i.volume
        }
        if (i?.attributes) {
            for (let a of i['attributes']) {
                items.property[a.name] = a.value.meta ? a.value?.meta?.name : a.value
            }
        }
        items.prise = {
            externalCode: i.externalCode,
            description: i.description
        }
        items.barcodes = {
            ean13: "2037391139352"
        }
        // Загрузка единиц измерения
        // if (i.uom !== undefined) {
        //     let uom = await getRecordFromModel(getIdFormUrl(i.uom.meta.href))
        //     console.log(uom)

        //     // const uom = await checkUom(getIdFormUrl(i.uom.meta.href))
        //     //items.uom = uom.isError === true ? 'шт' : "шт";
        // }
        // // ссылка на картинку товара
        // console.log(i.images.meta.href)
        product.push(items)
        items = {}
    }
    return {
        data: product,
        size: size,
        limit: limit,
    }

}


// Получение Товаров из мой склад
const getAssortment = async (req, res) => {
    // Указываем в фильтре дату последней синхронизации.

    const filterDateMS = lastUpdateDate === null ? { filter: "" } : { filter: await getInfoMaxData("productMS") }
    let params = { limit: limitLoader, offset: 0, ...filterDateMS }


    // получаем объект data с данными для записи в таблицу
    // {    data: product,
    //      size: size,
    //      limit: limit,   }
    let check = true;
    do {
        const data = await axiosGet(config(params), processingData)

        console.log(data)
        //  Тут будем обрабатывать все характеристики для товара
        // 
        //         
        const mes = await getProductDB(data.data)
        params.offset = params.offset + params.limit
        if (data.size < params.offset) {
            check = false
        }

        // offset: 0,
        //filterMS = { ...filterMS { limit: , offset: }

        console.log(mes)
    } while (check)

    res.status(200).send({ mes: "Зарос выполнен" })
}

module.exports = {
    getAssortment
}
