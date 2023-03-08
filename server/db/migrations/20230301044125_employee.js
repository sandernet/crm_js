const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "employees", deps: []
 *
 */

const info = {
  revision: 2,
  name: "employee",
  created: "2023-03-01T04:41:25.594Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "employees",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        externalCode: { type: Sequelize.STRING, field: "externalCode" },
        fullName: { type: Sequelize.STRING, field: "fullName" },
        name: { type: Sequelize.STRING, field: "name" },
        phone: { type: Sequelize.STRING, field: "phone" },
        position: { type: Sequelize.STRING, field: "position" },
        password: { type: Sequelize.STRING, field: "password" },
        archived: { type: Sequelize.BOOLEAN, field: "archived" },
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
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["employees", { transaction }],
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
