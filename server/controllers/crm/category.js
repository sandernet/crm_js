const models = require("../../db/models");
const { Op } = require("sequelize");

const { defaultGet } = require("../../utils/db");

let model = models.category



const getOneExternalCode = async (externalCodeMS) => {
  return await model.findOne({ where: { externalCodeMS: externalCodeMS } })
}

module.exports = {
  getOneExternalCode
};