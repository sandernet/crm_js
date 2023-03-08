const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn(digitalCode) => "uoms"
 * addColumn(fullName) => "uoms"
 * changeColumn(name) => "categories"
 * changeColumn(archived) => "employees"
 *
 */

const info = {
  revision: 9,
  name: "allTables-4",
  created: "2023-03-02T02:27:04.903Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "uoms",
      "digitalCode",
      { type: Sequelize.STRING, field: "digitalCode" },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "uoms",
      "fullName",
      { type: Sequelize.STRING, field: "fullName" },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "categories",
      "name",
      { type: Sequelize.STRING, field: "name", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "employees",
      "archived",
      { type: Sequelize.INTEGER, field: "archived", defaultValue: 0 },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["uoms", "digitalCode", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["uoms", "fullName", { transaction }],
  },
  {
    fn: "changeColumn",
    params: [
      "categories",
      "name",
      { type: Sequelize.STRING, field: "name", allowNull: false, unique: true },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "employees",
      "archived",
      { type: Sequelize.INTEGER, field: "archived" },
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
