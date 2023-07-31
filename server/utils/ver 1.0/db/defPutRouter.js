const { checkMethod } = require("../checkMethod");

const action = (model, fields = null, operation) => {
  return async (req, res) => {
    const { body } = req;
    res.status(200).send(await operation(fields, body, model));
  };
};

const def = (operation) => {
  if (typeof operation === "function") {
    return (router, moduleName, model, fields = null, checkJWT) => {
      if (typeof checkJWT === "function") {
        router.put(
          "/",
          checkJWT,
          checkMethod(action(model, fields, operation), moduleName)
        );
      } else {
        router.put(
          "/",
          checkMethod(action(model, fields, operation), moduleName)
        );
      }
    };
  }
  throw new Error("Operation is not a function");
};

module.exports = def;
