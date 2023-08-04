const { DataTypes } = require("sequelize");

// ==============================================
// Таблица Товаров
//-----------------------------------------------
module.exports = (db, options, modelName) => {
    const model = db.define(
        modelName,
        {
            name: { // Наименование товара
                type: DataTypes.STRING,
            },
            description: { // путь к папке
                type: DataTypes.STRING,
            },
            archived: { // Активный / архивный
                type: DataTypes.INTEGER,
                defaultValue: 1
            },
        },
        options
    );

    // Связи с другими таблицами
    model.associate = (models) => {
        // Родительская категория
        model.belongsTo(model, {
            foreignKey: "parent_id",
            as: "parent",
            onUpdate: "NO ACTION",
            onDelete: "SET NULL",
        });
        model.hasMany(model, {
            foreignKey: "parent_id",
            as: "children",
            onUpdate: "NO ACTION",
            onDelete: "SET NULL",
        });

        // МаркетПлейс 
        model.belongsTo(models.marketplace, {
            onUpdate: "NO ACTION",
            onDelete: "NO ACTION",
        });
        // Категория товара из МаркетПлейс 
        model.belongsTo(models.marketplaceCategory, {
            onUpdate: "NO ACTION",
            onDelete: "NO ACTION",
        });
        // Привязка Торгового предложения к товару  
        model.belongsTo(models.product, {
            onUpdate: "NO ACTION",
            onDelete: "NO ACTION",
        });
        // Привязка Торгового предложения со свойствами  
        model.hasMany(models.productProperty, {
            foreignKey: "tradeOfferId",
            as: "tradeOffer",
            onUpdate: "NO ACTION",
            onDelete: "SET NULL",
        });

    }
    return model;
};
