const {DataTypes} = require("sequelize");

// ==============================================
//Картинки товаров
// norm большая картинка
// miniature миниатюра
// tiny маленькая для списков
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "imageProduct",
        {
            nameFiles: { // название файла
                type: DataTypes.STRING,
            },
            pathName: { // путь к папке
                type: DataTypes.STRING,
            },
            typeImage: {
                // Миниатюра
                type: DataTypes.STRING(4),
            }
        },
        options
    );
    return model;
};

module.exports = def;