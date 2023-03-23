// подгружаем настроенный axios
const { axiosGet } = require('./config')

// Параметры запроса в мой склад
const config = {
    method: 'get',
    // Добавляем фильтры ?filter=updated>=2023-03-13 21:43:42',
    url: '/entity/product',
    headers: {
        "Content-Type": "application/json"
    },
    params: {
        limit: 3,
        offset: 0
    },
}

// Получение Товаров из мой склад
const getAssortment = async (req, res) => {
    console.log(req)
    res.status(200).send(await axiosGet(config, processingData))
}

// обработчик данных
const processingData = (msObj) => {

    for (let i of msObj['rows']) {
        // В какой категории товар
        console.log(i.pathName)
        // ссылка на категорию товара
        console.log(i.productFolder.meta.href)
        // Получаем категорию товара

        // ссылка на единицу измерения
        console.log(i.uom.meta.href)

        // ссылка на картинку товара
        console.log(i.images.meta.href)

        // ссылка на картинку товара
        console.log(i.barcodes)
        /* 
        создаем товары из запроса
    */}
    return { message: `Создано XXX товаров` }
}

module.exports = {
    getAssortment
}
