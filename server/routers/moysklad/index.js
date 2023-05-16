const { checkMethod } = require("../../utils");
const { getAssortment } = require("../../controllers/moysklad/loaderProduct")


module.exports = (router, moduleName) => {
    router.get("/", checkMethod(getAssortment, moduleName));
}