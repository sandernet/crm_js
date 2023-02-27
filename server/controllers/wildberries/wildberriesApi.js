const axios = require('axios')

//const {Product} = require("../../models/models");


// Получение списка товаров из WB
const getCardProduct = () => {
    // {
    //     "sort": {
    //     "cursor": {
    //         "updatedAt": "2022-09-23T17:41:32Z",
    //             "nmID": 66965444,
    //             "limit": 1000
    //     },
    //     "filter": {
    //         "textSearch": "test",
    //         "withPhoto": -1
    //     },
    //     "sort": {
    //         "sortColumn": "updateAt",
    //             "ascending": false
    //     }
    // }
    // }

    let data = JSON.stringify({
        "sort": {
            "cursor": {
                "limit": 1000
            },
            "filter": {
                "withPhoto": -1
            }
        }
    });

    const config = {
        method: 'post',
        url: 'https://suppliers-api.wildberries.ru/content/v1/cards/cursor/list',
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NJRCI6ImVjODAxNjlkLWYzNzUtNDllMC05NDk1LWJmZTk0MDFjNDA1ZiJ9.TYoxp2EC2zXVrmEgyN8GN8HP07l0xjjdYPVwe-RpZlc',
            'Content-Type': 'application/json'
        },
        data: data
    }

    return axios(config) // возрвщает запрошеные данные
        .then(response => response.data)
        .catch(error => {
            message: 'Ошибка!!!'
        })
}

class WBProductsController {
// функция Импортирования товаров из мой склад
    async syncProductsMS(req, res) {
        const msObj = await getCardProduct()


        res.statusCode = 200
        return res.json(JSON.stringify(msObj))

    }
}



// Импортируем как новый объект
module.exports = new WBProductsController()