const axiosModule = require('axios')


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
                // c помощью процедуры переданной в параметре
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

module.exports = {
    axiosGet
}