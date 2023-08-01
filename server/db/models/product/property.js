const { DataTypes } = require("sequelize");

// ==============================================
// Характеристики товаров
//-----------------------------------------------
module.exports = (db, options, modelName) => {
    const model = db.define(
        modelName,
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
        model.belongsTo(models.marketplaceProperty, {
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });

        // Таблица товаров
        model.belongsTo(models.product, {
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
    };
    return model;
};
