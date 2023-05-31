const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "propertyMarketPlaces", deps: [marketPlaces]
 *
 */

const info = {
  revision: 4,
  name: "ParamsmarketPlace",
  created: "2023-05-29T04:44:32.381Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "propertyMarketPlaces",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        params: { type: Sequelize.STRING, field: "params" },
        description: { type: Sequelize.TEXT, field: "description" },
        example: { type: Sequelize.TEXT, field: "example" },
        requiredField: { type: Sequelize.INTEGER, field: "requiredField" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
        marketPlaceId: {
          type: Sequelize.INTEGER,
          field: "marketPlaceId",
          onUpdate: "NO ACTION",
          onDelete: "NO ACTION",
          references: { model: "marketPlaces", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["propertyMarketPlaces", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
