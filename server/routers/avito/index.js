const { checkMethod } = require("../../utils");
const { loadingPropertyAvito, createXml } = require("../../controllers/avito")

module.exports = (router, moduleName) => {
    //router.post("/", checkMethod(post, moduleName));
    router.get("/createXml/", checkMethod(createXml, moduleName));
    router.get("/loadingpropertyavito/", checkMethod(loadingPropertyAvito, moduleName));
}