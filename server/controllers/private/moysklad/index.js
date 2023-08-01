const { loadingProduct } = require("./loading/product")
const { loadingCategory } = require("./loading/category")
const { getListCities } = require("./loading/getListCities")

module.exports = (router, moduleName) => {
    router.get("/loadingproduct/", loadingProduct);
    router.get("/loadingcategory/", loadingCategory);
    router.get("/getcities/", getListCities);
    return true
}