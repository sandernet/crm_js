const { DataTypes } = require("sequelize");

// ==============================================
// Карточка для маркетплейсов
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

        },
        options
    );

    // Связи с другими таблицами
    model.associate = (models) => {

        // Замыкаем для иерархии
        model.hasMany(model, { as: 'children', foreignKey: 'parentId' })
        model.belongsTo(model, { as: 'parent', foreignKey: 'parentId' })

        // таблица маркетплейсов
        model.belongsTo(models.marketPlace, {
            foreignKey: "marketPlaceId",
            as: "marketPlace",
            onUpdate: "NO ACTION",
            onDelete: "NO ACTION",
        });

        model.belongsTo(models.categoryMarketPlace, {
            foreignKey: "categoryMarketPlaceId",
            as: "categoryMP",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });

        // таблица C товарами Связка
        model.belongsTo(models.product, {
            foreignKey: "productId",
            as: "product",
            onUpdate: "NO ACTION",
            onDelete: "NO ACTION",
        });

        // Свойства товаров Многие ко многим
        model.belongsToMany(models.property, {
            through: "propertyCardMP",
            foreignKey: "cardMPId",
            otherKey: "propertyId",
            as: "property"
        });
    };

    return model;
};

