// const { get } = require('../../controllers/crm/property')
const { checkMethod } = require("../../utils");

const { getImagesId } = require("../../controllers/crm/images");


module.exports = (router, moduleName) => {
  router.get("/", checkMethod(getImagesId, moduleName));
};