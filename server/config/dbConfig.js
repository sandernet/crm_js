if (process.env.MIGRATE_TOOL) {
    require("dotenv").config();
}

const dev = {
    username: process.env.DB_DEV_MYSQL_USER,
    password: process.env.DB_DEV_MYSQL_PASSWORD,
    database: process.env.DB_DEV_MYSQL_DB,
    host: process.env.DB_DEV_MYSQL_HOST,
//    port: process.env.DEV_PORT,
    dialect: process.env.DB_DEV_DIALECT,
    logging: (msg) => {},
    define: {},
};

module.exports = { development: dev, test: null, production: null };