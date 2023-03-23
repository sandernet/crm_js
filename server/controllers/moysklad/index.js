const { checkMethod } = require("../../utils");
const { getAssortment } = require("../moysklad/loaderProduct")

// Плучение данных
// const get = (req, res) => {
//     const data = getAssortment()
//     res.status(200).send(data);
// };

module.exports = (router, moduleName) => {
    //router.post("/", checkMethod(post, moduleName));
    router.get("/", checkMethod(getAssortment, moduleName));
}