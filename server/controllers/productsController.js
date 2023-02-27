const {Product, ImagesProduct, Barcodes} = require("../models/models");
const Path = require("path");
const Fs = require("fs");


class ProductsController {

    async getOneProduct(externalCode){
        const candidate = await Product.findOne({where: {externalCode: externalCode}})
        return candidate
    }
    // Добавление товара в таблицу
    async addProducts(req) {
        const {externalCode, vendorCode, name, description, uomproductUom, categoryId} = req // достаем из тела запроса данные
        //создаем товар в базе данных
        const product = await Product.create(
            {
                externalCode: externalCode,
                vendorCode: vendorCode,
                name: name,
                description: description,
                uomproductUom: uomproductUom,
                categoryId: categoryId,
            })
        return JSON.stringify(product) // возращаем запись
    }

    //Записать штрихкод в базу
    async writerBarcodes(idProduct, typeBarcodes, Barcode) {
        await Barcodes.create({
            productId: idProduct,
            typeBarcodes: typeBarcodes,
            barcode: Barcode,
        })
    }

    // Создаем запись в таблице с картинками
    //Запись картинки в таблицу
    async addImages(productId, nameFiles, pathName, typeImage = 'norm') {
        await ImagesProduct.create({
                productId: productId,
                nameFiles: nameFiles,
                pathName: pathName,
                typeImage: typeImage
            })
    }


    //Запись картинки на диск
// msObjImg Картинка
// pathFolder путь до файла
// filename Имя файла
    async writerFileImage(msObjImg, pathFolder, filename) {

        const pathFolderImage = Path.resolve(__dirname, '..', '..', 'static', pathFolder)

        // если каталога для картинки не существует
        if (!Fs.existsSync(pathFolderImage)) {
            Fs.mkdirSync(pathFolderImage, {recursive: true});
        }

        const path = Path.resolve(pathFolderImage, filename)

        //записываем файл картинки на диск
        const writer = Fs.createWriteStream(path)
        msObjImg.pipe(writer)
        writer.on('finish', () => {
            console.log('Successfully downloaded file!', path)
        })
    }

}

// Импортируем как новый объект
module.exports = new ProductsController()