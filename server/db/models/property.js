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
        // таблица маркетплейсов
        model.belongsTo(models.propertyMarketPlace, {
            foreignKey: "propertyMPId",
            as: "propertyMP",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });

        // Таблица товаров
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