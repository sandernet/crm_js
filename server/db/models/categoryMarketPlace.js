const { DataTypes } = require("sequelize");

// ==============================================
// Категории товаров
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "categoryMarketPlace",
        {
            name: {
                type: DataTypes.STRING,
            },
            externalCodeMS: { //id из моё склада
                type: DataTypes.STRING,
                unique: true,
            },
            description: { // Описание категории
                type: DataTypes.TEXT,
            },
            url: { // Описание категории
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
    };
    return model;
}

module.exports = def;