const {DataTypes} = require("sequelize");

// ==============================================
//Набор характеристик для категории товаров
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "categoryProperty",
        {
            allow_Null: { // Обязательное заполнение
                type: DataTypes.INTEGER,
            }
        },
        options
    );

    // Связи с другими таблицами
    model.associate = (models) => {
        // таблица категории товаров
        model.belongsTo(model, {
            foreignKey: "categoryId",
            as: "category",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });

        // Таблица свойств (характеристик)
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