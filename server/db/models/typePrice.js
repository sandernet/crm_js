const { DataTypes } = require("sequelize");

// ==============================================
// Вид цены
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "typePrice",
        {
            name: {
                type: DataTypes.STRING,
                primaryKey: true,
                unique: true,
                allowNull: false
            },
        },
        {
            // Входящие настройки
            ...options,
            // Можно добавить свои черех ","
            // timestamps: false
            createdAt: false,
            // Изменяем название `updatedAt`
            // updatedAt: false,
        }
    );
    return model;
};

module.exports = def;