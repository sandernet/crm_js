const axios = require('axios')
const productsController = require('../productsController')
const categoryController = require('../сategoriesControlles')



// Получение картинок товаров из мой склад
// задаем ссылку на картинки товара
const getImagesProduct = async (productId, href) => {
    // получаем список кантинок
    const msObj = await getDataMS(href)

    // Перебераем список картинок в цикле
    for (let i of msObj['rows']) {

        // получаем картинки из МСклад
        const msObjImg = await getDataMS(i.meta.downloadHref, 'stream')
        let pathName = i.meta.href.slice(56, 58)

        // записываем картинку на диск
        await productsController.writerFileImage(msObjImg, pathName, i.filename)
        // Создаем запись в таблице с картинками
        await productsController.addImages(productId, i.filename, pathName)


        // получаем миниатюры из МСклад
        const msObjImgMiniature = await getDataMS(i.miniature.downloadHref, 'stream')
        await productsController.writerFileImage(msObjImgMiniature, pathName + '/miniature', i.filename)
        await productsController.addImages(productId, i.filename, pathName, 'mini')


        // получаем крошечную картинку из МСклад
        const msObjImgTiny = await getDataMS(i.tiny.href, 'stream')
        await productsController.writerFileImage(msObjImgTiny, pathName + '/tiny', i.filename)
        await productsController.addImages(productId, i.filename, pathName, 'tiny')

    }
}

// Получение Товаров из мой склад
const getAssortment = () => {
    const config = {
        method: 'get',
        url: 'https://online.moysklad.ru/api/remap/1.2/entity/assortment',
        headers: {
            'Authorization': 'Bearer ' + process.env.MS_TOKEN
        },
        params: {
            limit: 10,
            offset: 10
        },
    }
    return axios(config) // возрвщает запрошеные данные
        .then(response => response.data)
        .catch(error => {
            message: 'Ошибка!!!' + error
        })
}

// Получение данных из мой склад
const getDataMS = (href, responseType = 'json') => {
    const config = {
        method: 'get',
        url: href, //ссылка на картинки
        responseType: responseType,
        headers: {
            'Authorization': 'Bearer ' + process.env.MS_TOKEN
        }
    }
    return axios(config) // возрвщает запрошеные данные
        .then(response => response.data)
        .catch(error => {
            message: 'Ошибка!!!'
        })
}// Получение данных из мой склад


const getCategory = async (pathName) => {
    // если Верхний уровень тогда категория 0
    if (pathName == '') {
        return 0
    }
    let foundCategory;
    let pos = 0;
    let categoryName = ''
    let foundPos = 1
    let parent_id = 0;
    while (foundPos > 0) {
        foundPos = pathName.indexOf('/', pos);
        categoryName = (foundPos == -1) ? pathName.slice(pos) : pathName.slice(pos, foundPos)

        // Ищем в базе категорию
        foundCategory = await categoryController.getSearchCategories(categoryName)

        if (foundPos == -1) {
            // и это конечная категория
            if (foundCategory != null) {
                //если находим, то возращаем найденую
                return foundCategory
            } else {
                //если НЕ находим, и это конечная категория то создаем и возращаем её
                return await categoryController.addCategory({
                    category: categoryName,
                    description: '',
                    parent_id: parent_id
                })
            }
        } else {
            if (foundCategory != null) {
                //если находим, то возращаем найденую
                parent_id = foundCategory.id
            } else {
                //если НЕ находим, и это конечная категория то создаем и возращаем её
                foundCategory = await categoryController.addCategory({
                    category: categoryName,
                    description: '',
                    parent_id: parent_id
                })
                parent_id = foundCategory.id
            }
        }
        pos = (foundPos == -1) ? pos : foundPos + 1; // продолжаем со следующей позиции
    }

}


class ProductMSController {
    // функция Импортирования товаров из мой склад
    async syncProductsMS(req, res) {
        let sumInsert = 0 // начальное значение количество созданных товаров
        try {
            const msObj = await getAssortment()
            for (let i of msObj['rows']) {
                // Проверяем есть ли такой пользователя в базе
                const candidate = await productsController.getOneProduct(i.id)
                if (!candidate) { // если есть не создаем

                    // создаем категории товаров
                    const category = await getCategory(i.pathName)

                    // создаем товар в базе данных
                    const newProduct = await productsController.addProducts({
                        externalCode: i.id,
                        vendorCode: i.code,
                        name: i.name,
                        description: i.description,
                        uomproductUom: 'шт',
                        categoryId: category.id,
                    })


                    // записываем штрихкод MS
                    if ((typeof i['barcodes'] !== 'undefined') && (newProduct)) {
                        for (let barcode of i['barcodes']) {
                            const key = Object.keys(barcode)
                            await productsController.writerBarcodes(newProduct.id, 3, key[0], barcode[key[0]])
                        }
                    }
                    // загружаем картинки к товару на диск
                    await getImagesProduct(newProduct.id, i.images.meta.href)
                    ++sumInsert
                }
            }
            res.statusCode = 200
            return res.json({message: 'Создано товаров ' + sumInsert})
        } catch
            (err) {
            res.statusCode = 200
            return res.json({message: 'Ошибка ' + err + 'Загружено ' + sumInsert + ' Товаров'})
        }
    }
}

module
    .exports = new ProductMSController()