const axiosModule = require('axios')
const { defGet } = require("../../utils/db/defGet")
const { getInfoMaxData, addSyncInfo } = require("../../utils/syncInfo")



// опции поумолчанию для запроса в мой склад
const axios = axiosModule.create({
    baseURL: process.env.MS_BASEURL,  // 'https://online.moysklad.ru/api/remap/1.2/',
    timeout: 1000,
    headers: {
        'Authorization': 'Bearer ' + process.env.MS_TOKEN
    },
    params: {
        limit: 1000,
        offset: 0
    },
});

// обработка ошибок 
// Написать
const processingError = (error) => {
    console.log("Будем обрабатывать ошибку");
    console.log("Сообщение об ошибке" + error);
    console.log(`Обработчик ошибки!!!`);
    return { message: `Обработчик ошибки!!!` }
}


// Промис запрос данных из мой склад
const axiosGet = (config, processingData) => {
    return new Promise((resolve, reject) => {
        axios(config)
            .then((response) => {
                // обрабатываем результат тут
                const message = processingData(response.data)
                resolve(message);
            })
            .catch((error) => {
                // обрабатываем ошибку здесть
                const message = processingError(error)
                reject(message);
            })
    })
}

/*
    из url мой склад берем ID элемента 
    href: "https://online.moysklad.ru/api/remap/1.2/entity/group/9aa89681-8d14-11eb-0a80-05d700001811",
*/
const getIdFormUrl = (url) => {
    const arrayUrl = url.split('/');
    return id = arrayUrl[arrayUrl.length - 1]
}


module.exports = {
    axiosGet,
    getIdFormUrl,
    defGet,
    getInfoMaxData,
    addSyncInfo
}