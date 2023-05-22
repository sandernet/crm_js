const { DataTypes } = require("sequelize");

// ==============================================
//Набор характеристик для категории товаров
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "syncInfo",
        {
            info: { // Информайия выполения операции
                type: DataTypes.STRING,
            },
            module: { // модуль в котором проходила операция
                type: DataTypes.STRING,
            },
            resultError: { // Результат выполнения операции
                type: DataTypes.INTEGER,
                defaultValue: 0
            }
        },
        options
    );

    return model;
};

module.exports = def;