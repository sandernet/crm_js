const {DataTypes} = require("sequelize");

// ==============================================
// маркетплейсы
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "marketPlace",
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

module.exports = def;