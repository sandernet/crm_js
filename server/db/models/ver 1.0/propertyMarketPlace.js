const { DataTypes } = require("sequelize");

// ==============================================
// Свойства из маркетплейсов
// для определенных категорий по маркПлейсам
//-----------------------------------------------
module.exports = (db, options, modelName) => {
    const model = db.define(
        modelName,
        {
            name: { // название параметра
                type: DataTypes.STRING,
                allowNull: false
            },
            params: { // Идентификатор для маркетплейса
                type: DataTypes.STRING,
            },
            description: { // описание параметра
                type: DataTypes.TEXT,
            },
            example: { // Пример заполнения
                type: DataTypes.TEXT,
            },
            requiredField: { // обязательный=[1], Не обязательный = null
                type: DataTypes.INTEGER,
            }
        },
        options
    );
    model.associate = (models) => {
        // таблица маркетплейсов
        model.belongsTo(models.marketPlace, {
            foreignKey: "marketPlaceId",
            as: "marketPlace",
            onUpdate: "NO ACTION",
            onDelete: "NO ACTION",
        });
        // таблица категорий маркетплейсов
        model.belongsTo(models.categoryMarketPlace, {
            foreignKey: "categoryMarketPlaceId",
            as: "categoryMarketPlace",
            onUpdate: "NO ACTION",
            onDelete: "NO ACTION",
        });
    };
    return model;
};

