const { DataTypes } = require("sequelize");

// ==============================================
// Категории товаров
//-----------------------------------------------
module.exports = (db, options, modelName) => {
    const model = db.define(
        modelName,
        {
            name: {
                type: DataTypes.TEXT,
            },
            externalCodeMS: { //id из моё склада
                type: DataTypes.STRING,
                unique: true,
            },
            parent_id: { //Родительский Id из мой склад
                type: DataTypes.STRING,
            },
            description: { // Описание категории
                type: DataTypes.TEXT,
            }
        },
        options
    );

    // Связи с другими таблицами
    model.associate = (models) => {
        model.hasMany(models.product, {
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
    }

    //     // Родительская категория 
    //     model.belongsTo(model, {
    //         foreignKey: "parent_id",
    //         as: "parent",
    //         onUpdate: "NO ACTION",
    //         onDelete: "SET NULL",
    //     });
    //     model.hasMany(model, {
    //         foreignKey: "parent_id",
    //         as: "children",
    //         onUpdate: "NO ACTION",
    //         onDelete: "SET NULL",
    //     });
    // }
    return model;
};

