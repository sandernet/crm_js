const { DataTypes } = require("sequelize");

// ==============================================
// маркетплейсы
//-----------------------------------------------
module.exports = (db, options, modelName) => {
    const model = db.define(
        modelName,
        {
            name: { // название Маркетплейса
                type: DataTypes.STRING,
                allowNull: false
            },
            token: { // Токен авторизации
                type: DataTypes.STRING,
            },
            description: { // путь к папке
                type: DataTypes.STRING,
            }
        },
        options
    );
    return model;
};
