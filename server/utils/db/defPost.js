const checkDataByFields = require("./checkData");
const { defPostFields } = require("./defFields");

const def = (fields = {}, data, model) => {
  const isArray = Array.isArray(fields);

  const check = isArray ? fields : fields?.check;
  const answer = isArray ? defPostFields : fields?.answer ?? defPostFields;

  if (check) {
    const checkData = checkDataByFields(check, data);

    if (checkData.isError) {
      throw new Error(checkData.message);
    }
  }

  return new Promise((resolve, reject) => {
    model
      .create(data)
      .then((answerData) => {
        if (answer) {
          let result = {};
          answer.forEach((field) => (result[field] = answerData[field]));
          resolve(result);
        }
        resolve(answerData);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = def;
