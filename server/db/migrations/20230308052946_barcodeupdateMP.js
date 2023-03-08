const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn(marketPlaceId) => "barcodes"
 *
 */

const info = {
  revision: 14,
  name: "barcodeupdateMP",
  created: "2023-03-08T05:29:46.860Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "barcodes",
      "marketPlaceId",
      {
        type: Sequelize.INTEGER,
        field: "marketPlaceId",
        onUpdate: "NO ACTION",
        onDelete: "CASCADE",
        references: { model: "barcodes", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["barcodes", "marketPlaceId", { transaction }],
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
