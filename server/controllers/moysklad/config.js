const { defGet } = require("../../utils/db/defGet")

// Взаимодейтсвие с таблицей логирования запросов к серверам API
const { getSyncMaxData, addSyncInfo } = require("./syncConfig")

const { axiosGet } = require('./axiosConfig')

// если задано null тогда загружаются все данные не зависимо от последней удачной загрузки
const lastUpdateDate = '-'//null;
const limitLoader = 100;


/*
    из url мой склад берем ID элемента 
    href: "https://online.moysklad.ru/api/remap/1.2/entity/group/9aa89681-8d14-11eb-0a80-05d700001811",
*/
const getIdFormUrl = (url) => {
    const arrayUrl = url.split('/');
    return arrayUrl[arrayUrl.length - 1]
}


module.exports = {
    axiosGet,
    getIdFormUrl,
    defGet,
    getSyncMaxData,
    addSyncInfo,
    lastUpdateDate,
    limitLoader
}