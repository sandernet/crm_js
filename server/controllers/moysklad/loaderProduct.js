// подгружаем настроенный axios
const { axiosGet, getIdFormUrl } = require('./config')

const { addSyncInfo } = require('./config')

const { checkCategory } = require("./loaderCategory")
const { checkUom } = require("./loaderUom")

const models = require("../../db/models");

let model = models.product

// Параметры запроса в мой склад
const config = {
    method: 'get',
    // Добавляем фильтры ?filter=updated>=2023-03-13 21:43:42',
    url: '/entity/product',
    headers: {
        "Content-Type": "application/json"
    },
    params: {
        limit: 100,
        offset: 0,
        // filter: "updated>=2023-03-13 21:43:42"
    },
}

// Обновление всех записей
const getProductDB = async (addDataDB) => {
    if (addDataDB.length > 0) {
        // загружаем в базу и получем ответ
        const detDataDB = await bulkCreateData(addDataDB)
        if (detDataDB) {
            const mes = `Обновлено ${detDataDB.length} роваров`;
            await addSyncInfo(mes, "productMS", 0)
            return mes
        }
    }
    else {
        const mes = `Что то пошло не так данные не добавлены`;
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

    let count = 0;
    let product = [];
    let items = {}
    let mes;
    for (let i of msObj['rows']) {

        items.idMS = i.id
        items.name = i.name
        items.description = i.description ? i.description : null
        // получаем id категории если категоря есть в базе 
        // если нету загружаем все категории"
        if (i.pathName !== '') {
            const category = await checkCategory(getIdFormUrl(i.productFolder.meta.href))

            if (category.isError === true)
                return
            items.categoryId = category.categoryId
        }
        // Загрузка единиц измерения
        if (i.uom !== undefined) {

            const uom = await checkUom(getIdFormUrl(i.uom.meta.href))
            if (uom.isError === true)
                return

            items.uomId = uom.uomId
        }

        // // ссылка на картинку товара
        // console.log(i.images.meta.href)

        // // ссылка на картинку товара
        // console.log(i.barcodes)
        /* 
        создаем товары из запроса
         */
        product.push(items)


        //product.push(await model.create(items))
        count++;
        items = {}
    }

    console.log(product)
    mes = await getProductDB(product)
    return { mes }
}


// Получение Товаров из мой склад
const getAssortment = async (req, res) => {
    //console.log(req)
    res.status(200).send(await axiosGet(config, processingData))
}

module.exports = {
    getAssortment
}
