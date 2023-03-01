const {DataTypes} = require("sequelize");

// ==============================================
// Единицы измерения
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "uom",
        {
            name: { // название файла
                type: DataTypes.STRING,
            },
        },
        options
    );

    return model;
};

module.exports = def;