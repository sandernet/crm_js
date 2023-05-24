const { checkMethod } = require("../../utils");
const { getAssortment } = require("../../controllers/moysklad")


module.exports = (router, moduleName) => {
    router.get("/", checkMethod(getAssortment, moduleName));
}