const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(createdAt) => "barcodes"
 * removeColumn(updatedAt) => "barcodes"
 * removeColumn(deletedAt) => "barcodes"
 *
 */

const info = {
  revision: 12,
  name: "barcodeupdate",
  created: "2023-03-07T11:49:57.702Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["barcodes", "createdAt", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["barcodes", "updatedAt", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["barcodes", "deletedAt", { transaction }],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "barcodes",
      "createdAt",
      { type: Sequelize.DATE, field: "createdAt", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "barcodes",
      "updatedAt",
      { type: Sequelize.DATE, field: "updatedAt", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "barcodes",
      "deletedAt",
      { type: Sequelize.DATE, field: "deletedAt" },
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
