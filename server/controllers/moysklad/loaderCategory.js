const { axiosGet } = require('./config')

// Параметры запроса в мой склад
const config = {
    method: 'get',
    // Добавляем фильтры ?filter=updated>=2023-03-13 21:43:42',
    url: '',
    headers: {
        "Content-Type": "application/json"
    },
}


// Получение Товаров из мой склад
const getData = async (req, res) => {
    axiosGet(config, processingData)
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
        */
        // если товара нету в базе тогда создаем 
        // if (!candidate) {
        //     //return
        // }
    }
    // res.statusCode = 200
    // return res.json({ message: 'Создано товаров ' + sumInsert })


    // console.log(data)
    res.status(200).send(msObj);
}

module.exports = {
    getData
}