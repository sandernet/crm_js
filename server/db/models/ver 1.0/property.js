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
        // Таблица товаров
        model.belongsTo(models.product, {
            foreignKey: "productId",
            as: "property",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
        // Свойства категорий Многие ко многим
        model.belongsToMany(models.cardMP, {
            through: "propertyCardMP",
            foreignKey: "propertyId",
            otherKey: "cardMPId",
            as: "cardMP"
        });
    };
    return model;
};
