const { checkMethod } = require("../../utils");
const { creatXml } = require("../avito/createXml")

// Плучение данных
// const get = (req, res) => {
//     const data = getAssortment()
//     res.status(200).send(data);
// };

module.exports = (router, moduleName) => {
    //router.post("/", checkMethod(post, moduleName));
    router.get("/", checkMethod(creatXml, moduleName));
}