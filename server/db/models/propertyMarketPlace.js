const { DataTypes } = require("sequelize");

// ==============================================
// маркетплейсы
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "propertyMarketPlace",
        {
            name: { // название параметра
                type: DataTypes.STRING,
                allowNull: false
            },
            params: { // Идентификатор для маркетплейса
                type: DataTypes.STRING,
            },
            description: { // описание параметра
                type: DataTypes.TEXT,
            },
            example: { // Пример заполнения
                type: DataTypes.TEXT,
            },
            requiredField: { // обязательный [1] параметр или нет null
                type: DataTypes.INTEGER,
            }
        },
        options
    );
    model.associate = (models) => {
        // таблица маркетплейсов
        model.belongsTo(models.marketPlace, {
            foreignKey: "marketPlaceId",
            as: "marketPlace",
            onUpdate: "NO ACTION",
            onDelete: "NO ACTION",
        });
        // таблица категорий маркетплейсов
        model.belongsTo(models.categoryMarketPlace, {
            foreignKey: "categoryMarketPlaceId",
            as: "categoryMarketPlace",
            onUpdate: "NO ACTION",
            onDelete: "NO ACTION",
        });
    };
    return model;
};

module.exports = def;