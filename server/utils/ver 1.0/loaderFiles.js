const Path = require("path");
const fs = require("fs");

//Запись файла на диск
// msObjImg файл с данными
// pathFolder путь до файла
// filename Имя файла
const writerFile = async (msObjImg, pathFolder, filename) => {
    const pathFolderImage = Path.resolve(__dirname, '..', '..', 'uploader', pathFolder)

    // если каталога для картинки не существует
    if (!fs.existsSync(pathFolderImage)) {
        fs.mkdirSync(pathFolderImage, { recursive: true });
    }

    const path = Path.resolve(pathFolderImage, filename)

    //записываем файл картинки на диск
    const writer = fs.createWriteStream(path)
    msObjImg.pipe(writer)
    writer.on('finish', () => {
        // console.log('Successfully downloaded file!', path)
    })
}


module.exports = { writerFile }