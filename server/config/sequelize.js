const { Op } = require("sequelize");
const configDB = require("./config.json");


// настройка универсальности при использовании разных баз данных
Op.getLike = function () {
    if (configDB.development.dialect === "postgres") {
        return this.iLike;
    }
    return this.like;
};