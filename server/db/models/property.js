const { DataTypes } = require("sequelize");

// ==============================================
// Характеристики товаров
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "property",
        {
            name: { // Наименование характеристики
                type: DataTypes.STRING,
            },

            value: { // значение характеристики
                type: DataTypes.STRING,
            }
        },
        options
    );
    // Связи с другими таблицами
    model.associate = (models) => {
        // таблица товаров
        model.belongsTo(models.marketPlace, {
            foreignKey: "marketPlaceId",
            as: "marketPlace",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });

        // Таблица свойств
        model.belongsTo(models.product, {
            foreignKey: "productId",
            as: "product",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
    };
    return model;
};

module.exports = def;