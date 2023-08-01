const { DataTypes } = require("sequelize");

// ==============================================
// Картинки товаров
// norm большая картинка
// mini миниатюра
// tiny маленькая для списков
//-----------------------------------------------
module.exports = (db, options, modelName) => {
    const model = db.define(
        modelName,
        {
            nameFiles: { // название файла
                type: DataTypes.STRING,
            },
            pathName: { // путь к папке
                type: DataTypes.STRING,
            },
            url: { // путь к папке
                type: DataTypes.STRING,
            },
            typeImage: {
                // Миниатюра
                type: DataTypes.STRING,
            }
        },
        options
    );

    // Связи с другими таблицами
    model.associate = (models) => {
        model.belongsTo(models.product, {
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
    };

    return model;
};
