const {DataTypes} = require("sequelize");

// ==============================================
// Единицы измерения
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "uom",
        {
            name: { // название единицы
                type: DataTypes.STRING,
            },
            fullName: { // Полное наименование
                type: DataTypes.STRING,
            },
            digitalCode: { // цифровой код
                type: DataTypes.STRING,
            },
        },
        options
    );

    return model;
};

module.exports = def;