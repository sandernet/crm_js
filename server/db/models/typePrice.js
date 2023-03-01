const {DataTypes} = require("sequelize");

// ==============================================
// Вид цены
//-----------------------------------------------
const def = (db, DataTypes, options) => {
    const model = db.define(
        "typePrice",
        {
            name: {
                type: DataTypes.STRING,
                primaryKey: true,
                unique: true,
                allowNull: false
            },
        },
        options
    );
    return model;
};

module.exports = def;