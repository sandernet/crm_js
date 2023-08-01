const { DataTypes } = require("sequelize");

module.exports = (db, defOptions, modelName) => {
    const model = db.define(
        modelName,
        {
            name: DataTypes.TEXT,

            externalCode: { // Внешний код сотрудника мой склад
                type: DataTypes.STRING,
            },
            archived: { // Пароль пользователя
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            fullName: { // Полное имя
                type: DataTypes.STRING,
            },
            phone: { // телефон пользователя
                type: DataTypes.STRING,
            },
            position: { // Должность
                type: DataTypes.STRING,
            },

            login: DataTypes.TEXT,
            password: DataTypes.TEXT,

            description: DataTypes.TEXT,

            isAdmin: DataTypes.BOOLEAN,
            isSuperAdmin: DataTypes.BOOLEAN,
        },
        defOptions
    );

    return model;
};