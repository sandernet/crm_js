const fs = require("fs");
const path = require("path");
const { compareStringInArray } = require("./compare");

const getErrorMessage = (fileName, message) => {
  console.log(`Error load "${fileName}": ${message}`);
};


// Проверяем параметр функции на объект и присутстие в параметре переменной path пути 
// Также проврем наличие в параметре options.exclude и что это не массив
const check = (options) => {
  if (!options && options !== "object" && !options.path) {
    return false;
  }

  if (options.exclude && !Array.isArray(options.exclude)) {
    return false;
  }
  return true;
};

// функция фильтрующая файлы index.js
const defExclude = (file) =>
  file.indexOf(".") !== 0 && file !== "index.js" && file.slice(-3) === ".js";


const arrayExclude = (exclude) => {
  return (file) => !compareStringInArray(file, exclude);
};

/**
 * This returns true if the operand inputArg is a String.
 * @param {*} options path - путь для загрузки
 * @returns {}
 */

// options =  { path: "./utils/auth", type: "authentication" },
// data = checkJWT, функция jwtMiddleware для проверки авторизации
// getData =  (moduleName) => {
//     const router = Router();
//     app.use(`/<путь >/`, router);
//     return router;
// }

module.exports = (options, data, getData) => {
  if (!check(options)) return;
  // проверяем существует ли путь к модулю
  if (!fs.existsSync(options.path)) return;
  // считываем из каталога все файлы
  fs.readdirSync(options.path)
    // фильтруем файлы по заданному критерию
    .filter(options.exclude ? arrayExclude(options.exclude) : defExclude)
    // Перебираем все загруженные файлы
    .forEach((file) => {
      // Считываем из файла модуля  файла в moduleName
      let moduleName = path.basename(file, ".js");
      if (
        options.moduleNameExtExclude &&
        typeof options.moduleNameExtExclude === "string"
      ) {
        // загружаем модуль и переводим в нижний регистр .toLowerCase()
        moduleName = path.basename(file, options.moduleNameExtExclude).toLowerCase();
      }
      if (options.moduleNameCb && typeof options.moduleNameCb === "function") {
        moduleName = options.moduleNameCb(file);
      }

      try {
        // из файла загрудаем функицю и проверяем на функцию
        const module = require(`../${options.path}/${file}`);
        if (typeof module === "function") {
          if (typeof getData === "function") {
            // запускаем функцию из входной переменной в loader
            // и получем route из функции getData(<moduleName>)
            module(getData(moduleName), moduleName, data);
          } else {
            module(data);
          }
          // показываем какой контролер подключен в консоль
          console.log(
            `✅ ${options.type ? options.type : "module"}: ${moduleName}`
          );
        } else {
          getErrorMessage(
            `${options.type}.${moduleName}`,
            "Error load module export is not function"
          );
        }
      } catch (error) {
        getErrorMessage(moduleName, error.message);
      }
    });
};
