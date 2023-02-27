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
            name: { // название Маркетплейса
                type: DataTypes.STRING,
                allowNull: false
            },
            token: { // Токен авторизации
                type: DataTypes.STRING,
            },
            description: { // путь к папке
                type: DataTypes.STRING,
            }
        },
        options
    );
    return model;
};

module.exports = def;