const axiosModule = require('axios')


// опции по умолчанию для запроса в мой склад
const axios = axiosModule.create({
    baseURL: process.env.MS_BASEURL,  // 'https://online.moysklad.ru/api/remap/1.2/',
    timeout: 10000,
    headers: {
        'Authorization': 'Bearer ' + process.env.MS_TOKEN
    },
    params: {
        limit: 1000,
        offset: 0
    },
});


const axiosConfig = (options) => {
    const { url, method = 'get', params, responseType = 'json' } = options
    const config = {
        ...{
            method: method,
            // url: '/entity/product',
            url: url,
            headers: {
                "Content-Type": "application/json"
            },
            params: {
                ...params
            }
        },
        ...{ responseType }
    }
    return config
}

// обработка ошибок 
// Написать
const processingError = (error) => {
    console.log("Будем обрабатывать ошибку");
    console.log("Сообщение об ошибке" + error);
    console.log(`Обработчик ошибки!!! из модуля axiosConfig`);
    return { message: `Обработчик ошибки!!! из модуля axiosConfig` }
}

// Промис запрос данных из мой склад
const axiosGet = (config, processingData) => {
    return new Promise((resolve, reject) => {
        axios(config)
            .then((response) => {
                // обрабатываем результат тут
                // c помощью процедуры переданной в параметре
                console.log(response)
                if (processingData === "function") {
                    const message = processingData(response.data)
                    resolve(message);
                }
                resolve(response.data);

            })
            .catch((error) => {
                // обрабатываем ошибку здесь
                const message = processingError(error)
                reject(message);
            })
    })
}

module.exports = {
    axiosGet,
    axiosConfig
}