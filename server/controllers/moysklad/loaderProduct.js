// подгружаем настроенный axios
const { axiosGet, getIdFormUrl } = require('./config')

const { getCategoty, getRecordFromModel, checkCategory } = require("./loaderCategory")

// Параметры запроса в мой склад
const config = {
    method: 'get',
    // Добавляем фильтры ?filter=updated>=2023-03-13 21:43:42',
    url: '/entity/product',
    headers: {
        "Content-Type": "application/json"
    },
    params: {
        limit: 5,
        offset: 0,
        // filter: "updated>=2023-03-13 21:43:42"
    },
}


// обработчик данных
const processingData = async (msObj) => {

    let count = 0;
    // let messages = {};
    let messages = [];

    let product = [];
    let items = {}
    for (let i of msObj['rows']) {

        // тогда загружаем все категории с даты обновления категорий"
        if (i.pathName !== '') {

            messages.push({ category: await checkCategory(getIdFormUrl(i.productFolder.meta.href)) })
            items.categoryId = messages[count].category.categoryId
        }

        // // ссылка на единицу измерения
        // console.log(i.uom.meta.href)

        // // ссылка на картинку товара
        // console.log(i.images.meta.href)

        // // ссылка на картинку товара
        // console.log(i.barcodes)
        /* 
        создаем товары из запроса
         */
        product.push(items)
        count++;
    }

    console.log(messages)
    console.log(product)
    return { ...product, ...messages }
}


// Получение Товаров из мой склад
const getAssortment = async (req, res) => {
    //console.log(req)
    res.status(200).send(await axiosGet(config, processingData))
}

module.exports = {
    getAssortment
}
