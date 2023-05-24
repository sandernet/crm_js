// подгружаем настроенный axios
const { axiosGet } = require('./axiosConfig')

// функции получение времени последней синхронизации модуля
// Функция добавления времени синхронизации модуля
const { getSyncMaxData, addSyncInfo } = require('./syncConfig')
const { limitLoader, getIdFormUrl } = require("./config")

const { checkCategory } = require("./loaderCategory")

// Какие поля нужно загружать из мой склад
const defPostCheckFieldsMS = ["article", "name", "idMS", "categoryId"];
const checkDataByFields = require("../../utils/db/checkData");

// БД 
const models = require("../../db/models");
// Таблица БД
const model = models.product

// Параметры запроса в мой склад
const config = (params) => {
    return {
        method: 'get',

        // url: '/entity/product',
        url: '/entity/assortment',
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
            const category = await checkCategory(getIdFormUrl(i.productFolder?.meta?.href))
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

        product.push(items)
        items = {}
    }
    return {
        data: product,
        size: size,
        limit: limit,
    }
}
// Создание либо обновление записи по id из внешнего источника
const addOrUpdateRecord = async (data, options, modelBD) => {
    try {
        // Проверяем, существует ли запись согласно условию
        let existingRecord = await modelBD.findOne({ where: options })

        if (existingRecord) {
            // Если запись уже существует, выполняем обновление
            await modelBD.update(data, { where: options });
            existingRecord = await modelBD.findOne({ where: options })
            console.log('Обновление записи')
            return existingRecord;
        } else {
            // Если запись не существует, выполняем добавление
            existingRecord = await modelBD.create(data);
            console.log('Создание записи')
            return existingRecord;
        }
    } catch (error) {
        throw new Error(error);
    }
};

// const bulkCreateData = async (dataArray, RecordId, model) => {
//     for (let i = 0; i < dataArray.length; i++) {
//         await addOrUpdateRecord(
//             dataArray[i],
//             {
//                 productId: dataArray[i].productId,
//                 name: dataArray[i].name
//             },
//             model)
//     };

//     return true
// };

// Получение Товаров из мой склад
const getAssortment = async (req, res) => {
    try {
        // Указываем в фильтре дату последней синхронизации.
        const filterDateMS = await getSyncMaxData("productMS")
        let params = { limit: limitLoader, offset: 0, ...filterDateMS }

        console.log(params)


        let check = true;
        let countProduct = 0;
        do {
            // получаем объект data с данными для записи в таблицу
            // {    data: product,
            //      size: size,
            //      limit: limit,   }
            const data = await axiosGet(config(params), processingData)

            //  Проходим по подготовленному массиву данных полученных из МойСклад 
            for (let i = 0; i < data.data.length; i++) {
                let Record = await addOrUpdateRecord(data.data[i], { idMS: data.data[i].idMS }, model)

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
            // Проверяем есть ли еще порция данных в МойСклад
            params.offset = params.offset + params.limit
            if (data.size < params.offset) {
                check = false
            }
        } while (check)
        console.log(`Обработано ${countProduct} записей`)
        addSyncInfo(`Обработано ${countProduct} записей`, 'productMS', 0)
        res.status(200).send({ mes: `Зарос выполнен! / Обработано ${countProduct} записей` })
    } catch (error) {
        console.log(`Зарос Не выполнен! ${error}`)
        addSyncInfo(`Зарос Не выполнен! ${error}`, 'productMS', 1)
        res.status(200).send({ mes: `Зарос Не выполнен! ${error}` })
    }


}

module.exports = {
    getAssortment
}
