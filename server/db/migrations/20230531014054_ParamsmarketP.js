const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(marketPlaceId) => "properties"
 * addColumn(propertyMPId) => "properties"
 *
 */

const info = {
  revision: 6,
  name: "ParamsmarketP",
  created: "2023-05-31T01:40:54.572Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["properties", "marketPlaceId", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "properties",
      "propertyMPId",
      {
        type: Sequelize.INTEGER,
        field: "propertyMPId",
        onUpdate: "NO ACTION",
        onDelete: "CASCADE",
        references: { model: "propertyMarketPlaces", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["properties", "propertyMPId", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "properties",
      "marketPlaceId",
      {
        type: Sequelize.INTEGER,
        field: "marketPlaceId",
        onUpdate: "NO ACTION",
        onDelete: "CASCADE",
        references: { model: "marketPlaces", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
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
