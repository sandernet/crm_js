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
            requiredField: { // обязательный [1] параметр или нет null
                type: DataTypes.INTEGER,
            }
        },
        options
    );
    model.associate = (models) => {
        // таблица маркетплейсов
        model.belongsTo(models.marketplace, {
            onUpdate: "NO ACTION",
            onDelete: "NO ACTION",
        });
        // таблица категорий маркетплейсов
        model.belongsTo(models.marketplaceCategory, {
            onUpdate: "NO ACTION",
            onDelete: "NO ACTION",
        });
        model.hasMany(models.productProperty, {
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
    };
    return model;
};

