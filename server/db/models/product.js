const { DataTypes } = require("sequelize");

// ==============================================
// Таблица Товаров
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "product",
        {
            article: { // Артикул Товара (Как у производителя если есть) берем из системы учета.
                type: DataTypes.STRING,
            },
            name: { // Наименование товара
                type: DataTypes.STRING,
            },
            idMS: { // Наименование товара
                type: DataTypes.STRING,
            },
            archived: { // Активный / архивный
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
        model.hasMany(models.imagesProduct, {
            foreignKey: "productId",
            as: "images",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
        model.hasMany(models.price, {
            foreignKey: "priceId",
            as: "price",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
    };

    return model;
};

module.exports = def;