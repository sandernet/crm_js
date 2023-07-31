const { DataTypes } = require("sequelize");

// ==============================================
// Связь карточки со свойствами карточки М-М
//-----------------------------------------------
module.exports = (db, options, modelName) => {
    const model = db.define(
        modelName,
        {
            value: { // значение характеристики
                type: DataTypes.STRING,
            }
        },
        options
    );

    return model;
};
