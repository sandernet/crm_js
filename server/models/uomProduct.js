const {DataTypes} = require("sequelize");

// ==============================================
//Единица измерения
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "product",
        {
            uom: { // Внешний код товара из мой склад
                type: DataTypes.STRING,
            },
        },
        options
    );
    return model;
};

module.exports = def;