const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "valueProperties", deps: [valueProperties, valueProperties]
 * addColumn(productId) => "imagesProducts"
 *
 */

const info = {
  revision: 5,
  name: "updateTables",
  created: "2023-03-01T05:58:53.366Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "valueProperties",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        value: { type: Sequelize.STRING, field: "value", allowNull: false },
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
        productId: {
          type: Sequelize.INTEGER,
          field: "productId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "valueProperties", key: "id" },
          allowNull: true,
        },
        propertyId: {
          type: Sequelize.INTEGER,
          field: "propertyId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "valueProperties", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "imagesProducts",
      "productId",
      {
        type: Sequelize.INTEGER,
        field: "productId",
        onUpdate: "NO ACTION",
        onDelete: "CASCADE",
        references: { model: "imagesProducts", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["imagesProducts", "productId", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["valueProperties", { transaction }],
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
