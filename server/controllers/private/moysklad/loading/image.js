// подгружаем настроенный axios
const { axiosGet, axiosConfig } = require('../config/axiosConfig')
const { moduleName } = require('../config/config')

// функции получение времени последней синхронизации модуля
// Функция добавления времени синхронизации модуля
const { addSyncInfo, writerFile } = require("@utils")

// БД 
const models = require("@models");
// Таблица БД
const model = models.productImages



const processingData = (msObj) => {
    let images = [];
    let items = {}
    // const msObjPars = JSON.parse(msObj)
    for (let i of msObj['rows']) {
        items.nameFiles = i.filename
        items.urlImage = i.meta.downloadHref
        items.miniature = i.miniature.downloadHref
        items.tiny = i.tiny.href;
        images.push(items)
        items = {}
    }
    return images
}

// Создаем запись в таблице с картинками
//Запись картинки в таблицу
const addImages = async (productId, nameFiles, url, pathName, typeImage) => {
    await model.create({
        productId: productId,
        nameFiles: nameFiles,
        pathName: pathName,
        url: url,
        typeImage: typeImage
    })
}


// Процедура запуска загрузки картинок для карточки товаров
const loadingImages = async (productId, url) => {
    try {
        if (url === null) {
            return
        }
        const options = { url: url, };
        const msObj = await axiosGet(axiosConfig(options), processingData)

        for (let i = 0; i < msObj.length; i++) {
            for (let key in msObj[i]) {
                if (key !== 'nameFiles') {

                    const options = { url: msObj[i][key], responseType: 'stream' };

                    // получение из мой склад
                    const fileImage = await axiosGet(axiosConfig(options))
                    let pathName = `${key}/` + url.slice(56, 58)
                    // запись на диск
                    await writerFile(fileImage, pathName, msObj[i].nameFiles)
                    await addImages(productId, msObj[i].nameFiles, options.url, pathName, key)
                }
            }
        };
    } catch (error) {
        console.log(`Картинки ${productId} не записаны ${error} / ${moduleName} / ${__filename}`)
        addSyncInfo(`Картинки ${productId} не записаны ${error}`, moduleName, __filename, 1)
    }
}

module.exports = {
    loadingImages
}