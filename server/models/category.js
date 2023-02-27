const {DataTypes} = require("sequelize");

// ==============================================
// модель «Категория», таблица БД «categories»
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "category",
        {
            category: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            description: { // Описание категории
                type: DataTypes.STRING,
            },
            parent_id: { //номер родительской категории поумолчанию 0;
                type: DataTypes.INTEGER, defaultValue: 0,
            }
        },
        options
    );
    return model;
};

module.exports = def;