const { DataTypes } = require("sequelize");

module.exports = (db, defOptions, modelName) => {
    const model = db.define(
        modelName,
        {
            caption: DataTypes.TEXT,

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