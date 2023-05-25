const { DataTypes } = require("sequelize");

// ==============================================
// Картинки товаров
// norm большая картинка
// mini миниатюра
// tiny маленькая для списков
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "imagesProduct",
        {
            nameFiles: { // название файла
                type: DataTypes.STRING,
            },
            pathName: { // путь к папке
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
            foreignKey: "productId",
            as: "product",
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
    };

    return model;
};

module.exports = def;