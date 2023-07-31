const delFields = ["createdAt", "updatedAt", "deletedAt", "id"];

const action = (model) => {
  return async (req, res) => {
    const data = Object.keys(model.rawAttributes)
      .map((field) => {
        return {
          field,
          type: model.rawAttributes[field].type.toSql(),
          allowNull:
            model.rawAttributes[field].allowNull !== undefined
              ? model.rawAttributes[field].allowNull
              : true,
        };
      })
      .filter((item) => !delFields.includes(item.field));
    res.status(200).send(data);
  };
};

const def = (router, model) => {
  router.get("/help/", action(model));
};

module.exports = def;
