// если задано null тогда загружаются все данные не зависимо от последней удачной загрузки
const lastUpdateDate = null;// '-'
const limitLoader = 150;
const moduleName = 'Мой Склад';

const getIdFormUrl = (url) => {
    if (url === undefined) {
        return null
    }
    const arrayUrl = url.split('/');
    return arrayUrl[arrayUrl.length - 1]
}


module.exports = {
    getIdFormUrl,
    lastUpdateDate,
    limitLoader,
    moduleName
}