"use strict";

//Работа с файлами
const fs = require("fs");
// Управление путями
const path = require("path");
// Подключаем ORM
const Sequelize = require("sequelize");
// Проверяем задана ли системная переменная при загрузки
// если нет используется переменная для разработки
const env = process.env.NODE_ENV || "development";
// Берем данные из файла конфигурации
const config = require(__dirname + "/../../config/dbConfig")[env];
// Создаем пустой объект db
const db = {};

const file = require("file");
// базовый путь до текущего файла
const basename = path.basename(__filename);

// Переменная для подключения
let sequelize;

// создаем подключение к базе
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      ...config,
      logging: null
    }
  );
}

// Добавляем опции для таблиц без удаления
// также можно добавлять другие параметры для таблиц
const defOptions = { paranoid: true };


let findFile = [];

function capitalizeFirstLetterWithoutIndex(string) {
  if (string === "index") {
    return "";
  }
  return string[0].toUpperCase() + string.slice(1);
}


file.walkSync(__dirname, (dir, dirs, files) => {
  files
    .filter((item) => {
      return (
        //Отфильтровываем файлы которые не удовлетворяют требования
        (item !== basename || dir.replace(__dirname, "") !== "") &&
        item.slice(-3) === ".js"
      );
    })
    .forEach((item) => {
      findFile.push(path.join(dir, item));
    });
});

const loaderFile = [];

findFile.forEach((item) => {
  const extension = path.extname(item);
  const file = path.basename(item, extension);

  const modelName =
    path.dirname(item.replace(__dirname + path.sep, "")) !== "."
      ? path
        .dirname(item.replace(__dirname + path.sep, ""))
        .split(path.sep)
        .map((item, index) =>
          index === 0 ? item : capitalizeFirstLetterWithoutIndex(item)
        )
        .join("") + capitalizeFirstLetterWithoutIndex(file)
      : file;

  const model = require(item);

  if (typeof model === "function") {
    const loadModel = model(sequelize, defOptions, modelName);

    if (loadModel) {
      loaderFile.push(
        modelName === loadModel.name
          ? modelName
          : `${modelName} (${loadModel.name})`
      );
      db[loadModel.name] = loadModel;
    }
  }
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

if (typeof console.logUserDone === "function") {
  console.logUserDone("SYSTEM", `DB-models:\n ${loaderFile.join(", ")}`);
} else {
  console.log("SYSTEM", `DB-models:\n ${loaderFile.join(", ")}`);
}

module.exports = { ...db };
// // ============================
// // ============================
// // ============================
// // Читаем директорию модуля с файлами .js
// fs.readdirSync(__dirname)
//   .filter((file) => {
//     // берем файлы только с расширением .js
//     return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
//   })
//   // перебираем все файлы
//   .forEach((file) => {
//     // из прочитанного файла берем модель таблицы с параметрами (defOptions)
//     const model = require(path.join(__dirname, file))(sequelize, defOptions);
//     // в объект db добавляем модель таблицы
//     db[model.name] = model;
//   });

// //перебираем вес объект db и добавляем связи из метода associate
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
