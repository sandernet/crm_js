const { DataTypes } = require("sequelize");

// ==============================================
// Таблица пользователей
//-----------------------------------------------
module.exports = (db, options, modelName) => {
    const model = db.define(
        modelName,
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
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
        },
        options
    );
    return model;
};

