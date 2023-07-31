const { DataTypes } = require("sequelize");

// ==============================================
//Набор характеристик для категории товаров
//-----------------------------------------------
module.exports = (db, options, modelName) => {
    const model = db.define(
        modelName,
        {
            info: { // Информайия выполения операции
                type: DataTypes.STRING,
            },
            module: { // модуль в котором проходила операция
                type: DataTypes.STRING,
            },
            action: { // модуль в котором проходила операция
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
