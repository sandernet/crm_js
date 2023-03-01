const {DataTypes} = require("sequelize");

// ==============================================
// Характеристики товаров
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "property",
        {
            name: { // Наименование характеристики
                type: DataTypes.STRING,
            },
        },
        options
    );
    return model;
};

module.exports = def;