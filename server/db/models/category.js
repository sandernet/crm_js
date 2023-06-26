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
                allowNull: false
            },
            externalCodeMS: { //id из моё склада
                type: DataTypes.STRING,
                unique: true,
            },
            parent_id: { //Родительский Id из мой склад
                type: DataTypes.STRING,
            },
            description: { // Описание категории
                type: DataTypes.STRING,
            }
        },
        options
    );
    // // Связи с другими таблицами
    // model.associate = (models) => {
    //     // Родительская категория 
    //     model.belongsTo(model, {
    //         foreignKey: "parent_id",
    //         //as: "parent_id",
    //         onUpdate: "NO ACTION",
    //         onDelete: "SET NULL",
    //     });
    // }
    return model;
};

