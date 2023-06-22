"use strict";

//Работа с файлами
const fs = require("fs");
// Управление путями
const path = require("path");
// Подключаем ORM
const Sequelize = require("sequelize");
// базовый путь до текущего файла
const basename = path.basename(__filename);
// Проверяем задана ли системная переменная при загрузки
// если нет используется переменная для разработки
const env = process.env.NODE_ENV || "development";
// Берем данные из файла конфигурации
const config = require(__dirname + "/../../config/dbConfig")[env];
// Создаем пустой объект db
const db = {};

// Переменная для подключения
let sequelize;

// создаем подключение к базе
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Добавляем опции для таблиц без удаления
// также можно добавлять другие параметры для таблиц
const defOptions = { paranoid: true };


// Читаем директорию модуля с файлами .js
fs.readdirSync(__dirname)
  .filter((file) => {
    // берем файлы только с расширением .js
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  // перебираем все файлы
  .forEach((file) => {
    // из прочитанного файла берем модель таблицы с параметрами (defOptions)
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes, defOptions);
    // в объект db добавляем модель таблицы
    db[model.name] = model;
  });

//перебираем вес объект db и добавляем связи из метода associate
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
