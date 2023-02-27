const {DataTypes} = require("sequelize");

// ==============================================
//Характеристики товаров
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "property",
        {
            name: { // Внешний код товара из мой склад
                type: DataTypes.STRING,
            },
        },
        options
    );
    return model;
};

module.exports = def;