const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(priceId) => "prices"
 * changeColumn(parent_id) => "categories"
 * changeColumn(parent_id) => "categories"
 *
 */

const info = {
  revision: 8,
  name: "category",
  created: "2023-07-26T04:23:42.976Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["prices", "priceId", { transaction }],
  },
  {
    fn: "changeColumn",
    params: [
      "categories",
      "parent_id",
      {
        type: Sequelize.STRING,
        onUpdate: "NO ACTION",
        onDelete: "SET NULL",
        references: { model: "categories", key: "id" },
        allowNull: true,
        field: "parent_id",
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "categories",
      "parent_id",
      {
        type: Sequelize.STRING,
        onUpdate: "NO ACTION",
        onDelete: "SET NULL",
        references: { model: "categories", key: "id" },
        allowNull: true,
        field: "parent_id",
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "prices",
      "priceId",
      {
        type: Sequelize.INTEGER,
        field: "priceId",
        onUpdate: "NO ACTION",
        onDelete: "CASCADE",
        references: { model: "products", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "categories",
      "parent_id",
      { type: Sequelize.STRING, field: "parent_id" },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "categories",
      "parent_id",
      { type: Sequelize.STRING, field: "parent_id" },
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
