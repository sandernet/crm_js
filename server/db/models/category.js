const { DataTypes } = require("sequelize");

// ==============================================
// Категории товаров
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "category",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            externalCodeMS: { //id из моё склада
                type: DataTypes.STRING,
                unique: true,
            },
            description: { // Описание категории
                type: DataTypes.STRING,
            },
            parent_id: { //-номер родительской категории поумолчанию 0;
                type: DataTypes.STRING,
                //defaultValue: 0,
            }
        },
        options
    );
    return model;
};

module.exports = def;