if (process.env.MIGRATE_TOOL) {
  require("dotenv").config();
}

const dev = {
  username: process.env.DEV_USERNAME,
  password: process.env.DEV_PASSWORD,
  database: process.env.DEV_DATABASE,
  host: process.env.DEV_HOST,
  //  port: process.env.DEV_PORT,
  dialect: process.env.DEV_DIALECT,
  // Включить и отключить логирование sequelize 
  // если закомментировать будет логирование в консоль
  logging: (msg) => { msg },
  define: {},
  timezone: "+00:00"
};

module.exports = { development: dev, test: null, production: null };
