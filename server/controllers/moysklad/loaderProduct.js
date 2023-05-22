// подгружаем настроенный axios
const { axiosGet, getIdFormUrl } = require('./config')

// функции получение времени последней синхронизации модуля
// Функция добавления времени синхронизации модуля
const { getInfoMaxData, addSyncInfo, lastUpdateDate, limitLoader } = require('./config')

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
            const category = await checkCategory(getIdFormUrl(i.productFolder.meta.href))
            items.categoryId = category ? category.id : null
        } else {
            items.categoryId = null
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
        items.price = {
            ['minPrice']: i.minPrice.value,

        }
        if (i?.salePrices) {
            for (let p of i['salePrices']) {
                items.price[p?.priceType?.id] = p?.value ? p?.value : 0

                //items.price['idMS'] = p?.priceType?.id ? p?.priceType?.id : null
            }
        }
        items.barcodes = {
            ean13: "2037391139352"
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
const addOrUpdateRecord = async (data, idMS) => {
    try {
        // Проверяем, существует ли запись согласно условию
        let existingRecord = await model.findOne({ where: idMS })

        if (existingRecord) {
            // Если запись уже существует, выполняем обновление
            await model.update(data, { where: idMS });
            existingRecord = await model.findOne({ where: idMS })
            console.log('Обновление записи')
            return existingRecord;
        } else {
            // Если запись не существует, выполняем добавление
            existingRecord = await model.create(data);
            console.log('Создание записи')
            return existingRecord;
        }
    } catch (error) {
        throw new Error(error);
    }
};


// Получение Товаров из мой склад
const getAssortment = async (req, res) => {
    try {
        // Указываем в фильтре дату последней синхронизации.
        const filterDateMS = lastUpdateDate === null ? { filter: "" } : { filter: await getInfoMaxData("productMS") }
        let params = { limit: limitLoader, offset: 0, ...filterDateMS }

        let check = true;
        let countProduct = 0;
        do {
            // получаем объект data с данными для записи в таблицу
            // {    data: product,
            //      size: size,
            //      limit: limit,   }
            const data = await axiosGet(config(params), processingData)

            //  Проходим по подготовленному массиву данных полученных из МойСклад 
            let Record;
            for (let i = 0; i < data.data.length; i++) {
                Record = await addOrUpdateRecord(data.data[i], { idMS: data.data[i].idMS }, model)
            };

            //  Тут будем обрабатывать все характеристики для товара

            console.log(data.data[i])
            console.log(Record)


            // Подсчитываем сколько записей добавлено
            countProduct = countProduct + data.data.length;
            // Проверяем есть ли еще порция данных в МойСклад
            params.offset = params.offset + params.limit
            if (data.size < params.offset) {
                check = false
            }
        } while (check)
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
