const { get, post, put, del } = require('../../controllers/crm/property')

const { checkMethod } = require("../../utils");

module.exports = (router, moduleName) => {
  // router.post("/", checkMethod(post, moduleName));
  router.get("/", checkMethod(get, moduleName));
  // router.put("/", checkMethod(put, moduleName));
  // // С проверкой на авторизацию
  // //router.delete("/", jwtCheck, checkMethod(del, moduleName));
  // router.delete("/", checkMethod(del, moduleName));
};