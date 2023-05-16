const { DataTypes } = require("sequelize");

// ==============================================
// Цены на товар + ключи Товара и Вида цены
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "price",
        {
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
        },
        options
    );

    // Связи с другими таблицами

    model.associate = (models) => {
        model.belongsTo(models.typePrice, {
            foreignKey: "typePriceId",
            as: "typePrice",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        })
        model.belongsTo(models.product, {
            foreignKey: "productId",
            as: "product",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        })
    };
    return model;
};

module.exports = def;