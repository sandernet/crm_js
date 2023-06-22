const path = require('path');

const { checkMethod } = require("../../utils");

const models = require("../../db/models");
const model = models.imagesProduct;


// отдаем картинку по id
const getImagesId = async (req, res) => {
    const { id } = req.query;
    const images = await model.findByPk(id)
    const filePath = path.resolve(__dirname, `../../../uploader/${images?.pathName}/${images?.nameFiles}`);
    res.sendFile(filePath);
}

module.exports = (router, moduleName) => {
    router.get("/", checkMethod(getImagesId, moduleName));
};