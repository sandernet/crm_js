// подгружаем настроенный axios
const { axiosGet, axiosConfig } = require('../config/axiosConfig')

const { limitLoader, getIdFormUrl, moduleName } = require("../config/config")


// параметр API MC для получение ассортимента товаров
const url = '/entity/customentity/4243e8f4-b8a4-11ed-0a80-0138001af90f'

// обработчик данных запроса из МойСклад
// Выдает массив с даннами для дальнейшей обработки
const processingData = async (msObj) => {
    let dataArrayCity = [];
    for (let i of msObj['rows']) {
        if (i?.code !== undefined) {
            dataArrayCity.push({
                name: i.name,
                telephone: i.code,
                description: i.description
            })
        }
    }
    return {
        size: msObj.meta.size,
        limit: msObj.meta.limit,
        data: dataArrayCity
    }
}

// Получение Товаров из мой склад
const getListCities = async (req, res) => {
    try {
        const data = await axiosGet(axiosConfig({ url: url }), processingData)
        res.status(200).send(data)
    } catch (error) {
        res.status(200).send({ mes: `Зарос Не выполнен! ${error}` })
    }
}

module.exports = {
    getListCities
}
