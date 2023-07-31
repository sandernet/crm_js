const { DataTypes } = require("sequelize");

// ==============================================
// Категории товаров
//-----------------------------------------------
module.exports = (db, options, modelName) => {
    const model = db.define(
        modelName,
        {
            name: {
                type: DataTypes.STRING,
            },
            marketPId: {
                type: DataTypes.STRING,
            },
            description: { // Описание категории
                type: DataTypes.TEXT,
            },
            info: { // Описание категории
                type: DataTypes.STRING,
            }
        },
        options
    );

    // Связи с другими таблицами
    model.associate = (models) => {
        // таблица маркетплейсов
        model.belongsTo(models.marketPlace, {
            foreignKey: "marketPlaceId",
            as: "marketPlace",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
        model.hasMany(models.cardMP, {
            foreignKey: "categoryMarketPlaceId",
            as: "categoryMP",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
    };
    return model;
}
