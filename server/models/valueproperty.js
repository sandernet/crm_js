const {DataTypes} = require("sequelize");

// ==============================================
//Значение характеристики товаров
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "valueproperty",
        {
            value: { // Внешний код товара из мой склад
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        options
    );
    return model;
};

module.exports = def;