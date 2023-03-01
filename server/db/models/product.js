const {DataTypes} = require("sequelize");

// ==============================================
// Таблица Товаров
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "product",
        {
            externalCode: { // Внешний код товара из мой склад
                type: DataTypes.STRING,
            },
            vendorCode: { // артикул товара из мой склад
                type: DataTypes.STRING,
            },
            name: { // Наименование товара
                type: DataTypes.STRING,
            },
            archived: { // архивный
                type: DataTypes.INTEGER,
                defaultValue: false
            },
        },
        options
    );

    // Связи с другими таблицами
    model.associate = (models) => {
        // Категория товара
        model.belongsTo(model, {
            foreignKey: "categoryId",
            as: "category",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });

        // Таблица свойств
        model.belongsTo(model, {
            foreignKey: "uomId",
            as: "uom",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
    };

    return model;
};

module.exports = def;