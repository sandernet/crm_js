const checkDataByFields = require("./checkData");
const { defPutFields, defPutCheckFields } = require("./defFields");

const def = (fields = {}, data, model) => {
  const isArray = Array.isArray(fields);

  const check = isArray
    ? defPutCheckFields
    : fields?.check ?? defPutCheckFields;
  const answer = isArray
    ? [...defPutFields, ...fields]
    : fields?.answer
    ? [...defPutFields, ...fields.answer]
    : defPutFields;

  if (check) {
    const checkData = checkDataByFields(check, data);

    if (checkData.isError) {
      throw new Error(checkData.message);
    }
  }

  return new Promise((resolve, reject) => {
    const { id, ...other } = data;
    model
      .update(other, { where: { id: id } })
      .then(() => {
        model
          .findOne({
            where: { id: id },
            attributes: {
              exclude: answer,
            },
          })
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = def;
