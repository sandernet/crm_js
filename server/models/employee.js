const {DataTypes} = require("sequelize");

// ==============================================
// Таблица пользователей
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "product",
        {
            externalCode: { // Внешний код сотрудника мой склад
                type: DataTypes.STRING,
            },
            fullName: { // Полное имя
                type: DataTypes.STRING,
            },
            name: { // Краткое имя сотрудника
                type: DataTypes.STRING,
            },
            phone: { // телефон пользователя
                type: DataTypes.STRING,
            },
            position: { // Должность
                type: DataTypes.STRING,
            },
            password: { // Пароль пользователя
                type: DataTypes.STRING
            },
            archived: { // Пароль пользователя
                type: DataTypes.BOOLEAN
            },
        },
        options
    );
    return model;
};

module.exports = def;