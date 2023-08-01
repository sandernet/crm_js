const { checkMethod } = require("@utils");

const { loadingProduct } = require("./loadingProduct")
const { loadingCategory } = require("./loadingCategory")
const { getListCities } = require("./getListCities")

module.exports = (router, moduleName) => {
    router.get("/loadingproduct/", checkMethod(loadingProduct, moduleName));
    router.get("/loadingcategory/", checkMethod(loadingCategory, moduleName));
    router.get("/getcities/", checkMethod(getListCities, moduleName));
}