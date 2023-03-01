const {DataTypes} = require("sequelize");

// ==============================================
//Значение характеристики товаров
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "valueProperty",
        {
            value: { // значение характеристики
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        options
    );

    // Связи с другими таблицами
    model.associate = (models) => {
        // таблица товаров
        model.belongsTo(model, {
            foreignKey: "productId",
            as: "product",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });

        // Таблица свойств
        model.belongsTo(model, {
            foreignKey: "propertyId",
            as: "property",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
    };
    return model;
};

module.exports = def;