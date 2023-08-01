const { DataTypes } = require("sequelize");

// ==============================================
// Цены на товар + ключи Товара и Вида цены
//-----------------------------------------------
module.exports = (db, options, modelName) => {
    const model = db.define(
        modelName,
        {
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            idMsTypePrice: {
                type: DataTypes.STRING,
            },
            name: {
                type: DataTypes.STRING,
            },
        },
        options
    );

    // Связи с другими таблицами

    model.associate = (models) => {
        model.belongsTo(models.priceType, {
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        })
        model.belongsTo(models.product, {
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
    };
    return model;
};
