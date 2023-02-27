// Получение сотрудников из мой склад
const axios = require("axios");


// Получение сотрудников из мой склад
// Возращает обьект с данными о тострудниках из API мой склад
// Описание
// https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-sotrudnik-poluchit-sotrudnikow

const getEmployee = () =>
{
    const config = {
        method: 'get',
        url: 'https://online.moysklad.ru/api/remap/1.2/entity/employee',
        headers: {
            'Authorization': 'Bearer ' + process.env.MS_TOKEN
        }
    }
    return axios(config) // возрвщает запрошеные данные
        .then(response => response.data)
        .catch((error) => {message: "'Ошибка!!!'" , + error})
}

module.exports = {
    getEmployee,
}
