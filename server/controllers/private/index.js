const path = require("path");
const file = require("file");
const { Router } = require("express");
const { jwtMiddleware } = require("@utils");

const basename = path.basename(__filename);

let findFile = [];
let controllers = [];


//  Если строка не index 
//  переводим первую букву в верхний регистр
//  Иначе возвращаем пустую строку 
function capitalizeFirstLetterWithoutIndex(string) {
    if (string === "index") {
        return "";
    }
    return string[0].toUpperCase() + string.slice(1);
}

// Перебираем все файлы в каталоге и подкаталогах
// записываем в массив findFile
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

const loadController = [];

findFile.forEach((item) => {
    const extension = path.extname(item);
    const file = path.basename(item, extension);

    const controllerName =
        path.dirname(item.replace(__dirname + path.sep, "")) !== "."
            ? path
                .dirname(item.replace(__dirname + path.sep, ""))
                .split(path.sep)
                .map((i, index) => index === 0 ? i : capitalizeFirstLetterWithoutIndex(i)
                )
                .join("/") + capitalizeFirstLetterWithoutIndex(file)
            : file;

    const controller = require(item);

    if (typeof controller === "function") {
        const router = Router();
        router.use(jwtMiddleware);

        const isLoad = controller(router, controllerName);

        if (isLoad) {
            loadController.push(controllerName);
            controllers.push({ name: `/api/${controllerName}`, router });
        }
    }
});

if (typeof console.logUserDone === "function") {
    console.logUserDone(
        "SYSTEM",
        `Controllers PRIVATE:\n ${loadController.join(", ")}`
    );
} else {
    console.log("SYSTEM", `Controllers PRIVATE:\n ${loadController.join(", ")}`);
}

process.controllers = { private: loadController };

module.exports = controllers;