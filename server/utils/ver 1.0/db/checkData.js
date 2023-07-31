const def = (fieldsCheck, data) => {
  let isError = false;
  let notFoundFields = [];

  if (Array.isArray(fieldsCheck)) {
    fieldsCheck.forEach((field) => {
      if (!(field in data)) {
        notFoundFields.push(field);
        isError = true;
      }
    });
  }

  return {
    isError,
    message: isError
      ? `Not found "${notFoundFields.join(",")}" in data incoming`
      : "",
  };
};

module.exports = def;
