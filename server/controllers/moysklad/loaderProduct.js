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
        limit: 2,
        offset: 0
    },
}

// Получение Товаров из мой склад
const getAssortment = async (req, res) => {
    //console.log(req)
    res.status(200).send(await axiosGet(config, processingData))
}

const creatCategory = (x) => {
    return { message: 'Создаем категорию', x }
}

const getCategoty = async (url, path) => {
    const category = await axiosGet(config.url = url, creatCategory)
    if (path !== '') {
        console.log(category)
        if (!category) {
            return category
        }
        console.log(category.x.productFolder.meta.href)
        console.log(category.x.pathName)
        await getCategoty(category.x.productFolder.meta.href, category.x.pathName)
    }
    //return category

}

// обработчик данных
const processingData = async (msObj) => {


    let count = 0;
    for (let i of msObj['rows']) {
        // В какой категории товар
        console.log(i.pathName)
        // ссылка на категорию товара

        await getCategoty(i.productFolder.meta.href, i.pathName)

        // ссылка на единицу измерения
        console.log(i.uom.meta.href)

        // ссылка на картинку товара
        console.log(i.images.meta.href)

        // ссылка на картинку товара
        console.log(i.barcodes)
        /* 
        создаем товары из запроса
         */
        count++;
    }

    return { message: `Обработано ${count} товаров` }

}

module.exports = {
    getAssortment
}
