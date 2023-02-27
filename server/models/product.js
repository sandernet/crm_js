const {DataTypes} = require("sequelize");

// ==============================================
// Таблица Товаров
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "product",
        {
            externalCode: { // Внешний код товара из мой склад
                type: DataTypes.STRING,
            },
            vendorCode: { // артикул товара из мой склад
                type: DataTypes.STRING,
            },
            name: { // Наименование товара
                type: DataTypes.STRING,
            },
            archived: { // архивный
                type: DataTypes.INTEGER,
                defaultValue: false
            },
        },
        options
    );
    return model;
};

module.exports = def;