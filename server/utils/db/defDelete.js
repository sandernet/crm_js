const checkDataByFields = require("./checkData");

const def = (fields, data, model) => {
  const check = fields ?? ["id"];

  if (check) {
    const checkData = checkDataByFields(check, data);

    if (checkData.isError) {
      throw new Error(checkData.message);
    }
  }

  return new Promise((resolve, reject) => {
    const { id } = data;
    model
      .destroy({ where: { id: id } })
      .then((mes) => {
        resolve(mes, id, "delete");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = def;
