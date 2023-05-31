// подгружаем настроенный axios
const { axiosGet, axiosConfig } = require('./axiosConfig')

// функции получение времени последней синхронизации модуля
// Функция добавления времени синхронизации модуля
const { getSyncMaxData, addSyncInfo } = require('../logging/syncLogging')
const { limitLoader, getIdFormUrl, moduleName } = require("./config")

const { getCategory } = require("./loadingCategory")
const { loadingImages } = require("./loadingImages")

// БД 
const models = require("../../db/models");
const { addOrUpdateRecord } = require("../../utils/db");
// Таблица БД
const model = models.product

// параметр API MC для получение ассортимента товаров
const url = '/entity/assortment'

// обработчик данных запроса из МойСклад
// Выдает массив с даннами для дальнейшей обработки
const processingData = async (msObj) => {
    let product = [];
    let items = {}

    // Вставить обработчик запросов с шагом 100 товаров
    let size = msObj.meta.size
    let limit = msObj.meta.limit

    for (let i of msObj['rows']) {

        items.idMS = i.id
        items.name = i.name
        items.article = i.article ? i?.article : null;

        // получаем id категории если категория есть в базе 
        // если нету загружаем все категории"
        if (i.pathName !== '') {
            const category = await getCategory(getIdFormUrl(i.productFolder?.meta?.href))
            items.categoryId = category ? category.id : null
        } else {
            items.categoryId = null
        }
        // Свойства
        items.property = {
            externalCode: i.externalCode,
            description: i.description,
            weight: i.weight,
            volume: i.volume
        }
        if (i?.attributes) {
            for (let a of i['attributes']) {
                items.property[a.name] = a.value.name ? a.value.name : a.value
            }
        }
        // штрихкод
        if (i?.barcodes) {
            for (let b of i['barcodes']) {
                for (let key in b) {
                    items.property[key + b[key]] = b[key]
                }
            }
        }

        // Цена
        items.price = {
            minPrice: {
                value: i?.minPrice ? i?.minPrice?.value : 0,
                name: "Минимальная цена"
            },
            buyPrice: {
                value: i?.buyPrice ? i?.buyPrice?.value : 0,
                name: "Закупочная"
            }
        }
        if (i?.salePrices) {
            for (let p of i['salePrices']) {
                items.price[p?.priceType?.externalCode] = {
                    value: p?.value ? p?.value : 0,
                    name: p?.priceType?.name
                }
            }
        }

        // ссылка на картинки товара
        items.urlImages = i?.images?.meta?.href !== undefined ? i?.images?.meta?.href : null

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
const loadingProduct = async (req, res) => {
    try {
        const startDateTime = new Date();
        console.log(`${startDateTime} - Время запуска обмена.`)
        const { isLoadingImages = true } = req.query
        // Указываем в фильтре дату последней синхронизации.
        const filterDateMS = await getSyncMaxData(moduleName, __filename)
        let params = { limit: limitLoader, offset: 0, ...filterDateMS }

        let check = true;
        let countProduct = 0;
        do {
            // получаем объект data с данными для записи в таблицу
            // {    data: product,
            //      size: size,
            //      limit: limit,   }
            console.log(params)
            const data = await axiosGet(axiosConfig({ url: url, params: params }), processingData)

            //  Проходим по подготовленному массиву данных полученных из МойСклад 
            for (let i = 0; i < data.data.length; i++) {
                let Record = await addOrUpdateRecord(data.data[i], { idMS: data.data[i].idMS }, model)

                // **************************************
                // Загрузка картинки
                if (isLoadingImages === 'true') { //если включена загрузка картинок
                    await loadingImages(Record.id, data.data[i].urlImages)
                }
                // **************************************
                //  Тут будем обрабатывать все характеристики для товара
                let dataProperty = data.data[i].property
                for (let key in dataProperty) {
                    await addOrUpdateRecord(
                        {
                            productId: Record.id,
                            name: key,
                            value: dataProperty[key]
                        },
                        {
                            productId: Record.id,
                            name: key
                        },
                        models.property)
                }

                // **************************************
                //  Тут будем обрабатывать цены
                let dataPrice = data.data[i].price
                for (let key in dataPrice) {
                    await addOrUpdateRecord(
                        {
                            productId: Record.id,
                            idMsTypePrice: key,
                            name: dataPrice[key].name,
                            price: parseFloat(dataPrice[key].value) / 100
                        },
                        {
                            productId: Record.id,
                            idMsTypePrice: key
                        },
                        models.price)
                }
            };

            // Подсчитываем сколько записей добавлено
            countProduct = countProduct + data.data.length;
            const actionDateTime = new Date();
            console.log(`${actionDateTime} - Загружено ${countProduct} товаров.....`)
            // Проверяем есть ли еще порция данных в МойСклад
            params.offset = params.offset + params.limit
            if (data.size < params.offset) {
                check = false
            }
        } while (check)
        const finishDateTime = new Date();
        console.log(`${finishDateTime} Обработано ${countProduct} товаров // ${moduleName} // ${__filename}`)
        addSyncInfo(`Обработано ${countProduct} товаров`, moduleName, __filename, finishDateTime, 0)
        res.status(200).send({ mes: `Зарос выполнен! / Обработано ${countProduct} товаров` })
    } catch (error) {
        const errorDateTime = new Date();
        console.log(`${errorDateTime} Зарос Не выполнен! -- ${error}--${moduleName}--${__filename}`)
        addSyncInfo(`Зарос Не выполнен! ${error}`, moduleName, __filename, errorDateTime, 1)
        res.status(200).send({ mes: `Зарос Не выполнен! ${error}` })
    }
}

module.exports = {
    loadingProduct
}
