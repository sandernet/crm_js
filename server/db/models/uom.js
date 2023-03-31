const { DataTypes } = require("sequelize");

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
            externalCodeMS: { //id из моё склада
                type: DataTypes.STRING,
                unique: true,
            },
            description: { // Полное наименование
                type: DataTypes.STRING,
            },
            code: { // цифровой код
                type: DataTypes.STRING,
            },
        },
        {
            // Входящие настройки
            ...options,
            // Можно добавить свои черех ","
            // timestamps: false
            createdAt: false,
            // Изменяем название `updatedAt`
            updatedAt: false,
        }
    );

    return model;
};

module.exports = def;