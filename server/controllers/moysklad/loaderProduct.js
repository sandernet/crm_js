const axiosModule = require('axios')
const { checkMethod } = require("../../utils");

const axios = axiosModule.create({
    baseURL: 'https://online.moysklad.ru/api/remap/1.2/',
    timeout: 1000,
    headers: {
        'Authorization': 'Beare ' + process.env.MS_TOKEN
    },
});


// Получение Товаров из мой склад
const getAssortment = (req, res) => {
    const config = {
        method: 'get',
        url: '/entity/assortment',
        params: {
            limit: 10,
            offset: 0
        },
    }
    return axios(config) // возрвщает запрошеные данные
        .then(response => {
            console.log(response.data);
            res.status(200).send(response.data);
        }
        )
        .catch(error => {
            res.status(401).send({ message: 'Ошибка!!!' + error })
        })
}

module.exports = (router, moduleName) => {
    //router.post("/", checkMethod(post, moduleName));
    router.get("/", checkMethod(getAssortment, moduleName));
}