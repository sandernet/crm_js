const { checkMethod } = require("../../utils");
const { loadingProduct, loadingCategory } = require("../../controllers/moysklad")


module.exports = (router, moduleName) => {
    router.get("/loadingproduct/", checkMethod(loadingProduct, moduleName));
    router.get("/loadingcategory/", checkMethod(loadingCategory, moduleName));
}