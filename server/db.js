require('dotenv').config()
const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_MYSQL_DB, //
    process.env.DB_MYSQL_DB,
    process.env.DB_MYSQL_PASSWORD,
    {
        dialect: "mysql",
        host: process.env.DB_MYSQL_HOST
    }
)