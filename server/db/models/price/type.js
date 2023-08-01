const { DataTypes } = require("sequelize");

// ==============================================
// Вид цены
//-----------------------------------------------
module.exports = (db, options, modelName) => {
    const model = db.define(
        modelName,
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
            // Можно добавить свои через ","
            // timestamps: false
            createdAt: false,
            // Изменяем название `updatedAt`
            // updatedAt: false,
        }
    );
    return model;
};
