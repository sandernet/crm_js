const { DataTypes } = require("sequelize");

// ==============================================
// Категории товаров
//-----------------------------------------------
module.exports = (db, options, modelName) => {
    const model = db.define(
        modelName,
        {
            name: {
                type: DataTypes.STRING,
            },
            externalCodeMS: { //id из моё склада
                type: DataTypes.STRING,
                unique: true,
            },
            description: { // Описание категории
                type: DataTypes.TEXT,
            },
            url: { // Описание категории
                type: DataTypes.STRING,
            }
        },
        options
    );
    // Связи с другими таблицами
    model.associate = (models) => {
        // таблица маркетплейсов
        model.belongsTo(models.marketplace, {
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
    };
    return model;
}
