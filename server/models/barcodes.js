const {DataTypes} = require("sequelize");

// ==============================================
//Штрихкоды товаров с разных маркетплейсов товаров
// Внешний ключ маркетплейс
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "barcodes",
        {
            typeBarcodes: { // Тип баркода
                type: DataTypes.STRING,
                allowNull: false
            },
            barcode: { // штрихкод
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        options
    );
    return model;
};

module.exports = def;