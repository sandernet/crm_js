const { DataTypes } = require("sequelize");

// ==============================================
// Таблица Товаров
//-----------------------------------------------
module.exports = (db, options, modelName) => {
    const model = db.define(
        modelName,
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
        model.belongsTo(models.productCategory, {
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
        model.hasMany(models.productImages, {
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
        model.hasMany(models.price, {
            foreignKey: "productId",
            as: "price",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
        model.hasMany(models.productProperty, {
            foreignKey: "productId",
            as: "property",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
    };

    return model;
};
