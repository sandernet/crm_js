// подгружаем настроенный axios
const { axiosGet, axiosConfig } = require('./axiosConfig')


// функции получение времени последней синхронизации модуля
// Функция добавления времени синхронизации модуля
const { addSyncInfo } = require('./syncConfig')
const { writerFile } = require("../../utils")

// БД 
const models = require("../../db/models");
// Таблица БД
const model = models.imagesProduct



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
const addImages = async (productId, nameFiles, pathName, typeImage) => {
    await ImagesProduct.create({
        productId: productId,
        nameFiles: nameFiles,
        pathName: pathName,
        typeImage: typeImage
    })
}


// Процедура запуска загрузки картинок для карточки товаров
const loadingImages = async (productId, url) => {
    try {
        const options = { url: url, };
        const msObj = await axiosGet(axiosConfig(options), processingData)

        for (let i = 0; i < msObj.length; i++) {
            for (let key in msObj[i]) {
                if (key !== 'nameFiles') {

                    const options = { url: msObj[i][key], responseType: 'stream' };
                    // получение из мой склад
                    const fileImage = await axiosGet(axiosConfig(options))
                    let pathName = `${key}/` + msObj[i][key].slice(56, 58)
                    // запись на диск
                    writerFile(fileImage, pathName, msObj[i].nameFiles)
                    addImages(productId, nameFiles, pathName, key)
                }
            }
        };
    } catch (error) {
        console.log(`Зарос Не выполнен! ${error}`)
        addSyncInfo(`Зарос Не выполнен! ${error}`, 'productImagesMS', 1)
    }
}

module.exports = {
    loadingImages
}