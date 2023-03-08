const { DataTypes } = require("sequelize");

// ==============================================
//Штрихкоды товаров с разных маркетплейсов товаров
// Внешний ключ маркетплейс
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "barcode",
        {
            typeBarcodes: { // Тип баркода
                type: DataTypes.STRING,
                allowNull: false
            },
            barcode: { // штрихкод
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            // Входящие настройки
            ...options,
            // Можно добавить свои черех ","
            // timestamps: false
            createdAt: false,
            // Изменяем название `updatedAt`
            updatedAt: false,
        }
    );

    // Связи с другими таблицами
    model.associate = (models) => {
        // таблица товар
        model.belongsTo(model, {
            foreignKey: "productId",
            as: "product",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
        // таблица маркетплейсов
        model.belongsTo(model, {
            foreignKey: "marketPlaceId",
            as: "marketPlace",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
    };

    return model;
};

module.exports = def;