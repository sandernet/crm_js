const checkDataByFields = require("./checkData");

const def = (fields, data, model, onGetWhere) => {
  const check = fields ?? ["id"];

  if (typeof onGetWhere !== "function") {
    throw new Error(`Error "onGetWhere" is not a function`);
  }

  if (check) {
    const checkData = checkDataByFields(check, data);

    if (checkData.isError) {
      throw new Error(checkData.message);
    }
  }

  return new Promise((resolve, reject) => {
    model
      .destroy({ where: onGetWhere() })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = def;
