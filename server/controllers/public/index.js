const path = require("path");
const file = require("file");
const { Router } = require("express");
const { routerCheck } = require("@utils");

const basename = path.basename(__filename);

let findFile = [];
let controllers = [];

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
                .join("/") + capitalizeFirstLetterWithoutIndex(file)
            : file;

    const model = require(item);

    if (typeof model === "function") {
        const router = Router();

        const loadModel = model(router, modelName);

        if (loadModel) {
            if (typeof routerCheck === "function") {
                const checkResult = routerCheck(router, ["put", "post", "delete"]);
                if (checkResult.length > 0) {
                    console.log(
                        `❌ in PUBLIC router \x1b[33m"${modelName.toUpperCase()}"\x1b[0m found dangerous method: \x1b[31m"${checkResult.join(
                            ", "
                        )}"\x1b[0m\n`
                    );
                }
            }

            loaderFile.push(modelName);
            controllers.push({ name: `/api/${modelName}`, router });
        }
    }
});

if (typeof console.logUserDone === "function") {
    console.logUserDone(
        "SYSTEM",
        `Controllers PUBLIC:\n ${loaderFile.join(", ")}`
    );
} else {
    console.log("SYSTEM", `Controllers PUBLIC:\n ${loaderFile.join(", ")}`);
}

module.exports = controllers;