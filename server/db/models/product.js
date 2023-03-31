const { DataTypes } = require("sequelize");

// ==============================================
// Таблица Товаров
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "product",
        {
            artical: { // Артикул
                type: DataTypes.STRING,
            },
            idMS: { // Внешний код товара из мой склад
                type: DataTypes.STRING,
            },
            vendorCode: { // артикул товара из мой склад
                type: DataTypes.STRING,
            },
            name: { // Наименование товара
                type: DataTypes.STRING,
            },
            description: { // Описание товара
                type: DataTypes.TEXT,
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
        model.belongsTo(models.category, {
            foreignKey: "categoryId",
            as: "category",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });

        // Таблица свойств
        model.belongsTo(models.uom, {
            foreignKey: "uomId",
            as: "uom",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
    };

    return model;
};

module.exports = def;