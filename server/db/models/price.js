const {DataTypes} = require("sequelize");

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
        model.belongsTo(model, {
            foreignKey: "typePriceId",
            as: "typePrice",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        })
        model.belongsTo(model, {
            foreignKey: "productId",
            as: "product",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        })
    };
    return model;
};

module.exports = def;