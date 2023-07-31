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
    // Связи с другими таблицами
    model.associate = (models) => {

        // таблица карточки товара
        model.hasMany(models.cardMP, {
            foreignKey: "marketPlaceId",
            as: "marketPlace",
            onUpdate: "NO ACTION",
            onDelete: "NO ACTION",
        });
    }
    return model;

};
