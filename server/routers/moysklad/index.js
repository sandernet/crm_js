const { checkMethod } = require("../../utils");
const { loadingProduct, loadingCategory, getListCities } = require("../../controllers/moysklad")


module.exports = (router, moduleName) => {
    router.get("/loadingproduct/", checkMethod(loadingProduct, moduleName));
    router.get("/loadingcategory/", checkMethod(loadingCategory, moduleName));
    router.get("/getcities/", checkMethod(getListCities, moduleName));
}