// подгружаем настроенный axios
const { axiosGet, getIdFormUrl } = require('./config')

const { getCategoty, getRecordFromModel } = require("./loaderCategory")

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



// обработчик данных
const processingData = async (msObj) => {

    let count = 0;
    let messages = {};
    messages.categoty = [];

    let product = [];

    for (let i of msObj['rows']) {
        // тогда загружаем все категории с даты обновления категорий"
        if (i.pathName !== '') {
            // получем категории из мой склад
            let category = getRecordFromModel(getIdFormUrl(i.productFolder.meta.href))

            if (!category) {
                // запускаем загрузку всех категорий
                const mesCategory = await getCategoty(filter)
                category = getRecordFromModel(getIdFormUrl(i.productFolder.meta.href))
                if (!category) {
                    return messages.categoty.push({ messages: '{Херня какая-то !!!' });
                }
            }

            product[count].id = category.id;


            messages.categoty.push(mesCategory);
            messages.categoty.push(mesCategory);
            //     // id для добавление товара
            //     ///////console.log(mesCategory.idForProductCreat)


            //     // await getCategoty(i.productFolder.meta.href, i.pathName, countingCreatCategory)
            //     // resolve.push(countingCreatCategory)
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
        count++;
    }

    messages.product = { productMessage: `Обработано ${count} товаров` }
    console.log(messages)
    return messages

}

module.exports = {
    getAssortment
}
