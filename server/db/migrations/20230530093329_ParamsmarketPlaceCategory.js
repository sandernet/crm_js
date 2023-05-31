const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "categoryMarketPlaces", deps: [marketPlaces]
 * addColumn(categoryMarketPlaceId) => "propertyMarketPlaces"
 *
 */

const info = {
  revision: 5,
  name: "ParamsmarketPlaceCategory",
  created: "2023-05-30T09:33:29.395Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "categoryMarketPlaces",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
        externalCodeMS: {
          type: Sequelize.STRING,
          field: "externalCodeMS",
          unique: true,
        },
        description: { type: Sequelize.TEXT, field: "description" },
        url: { type: Sequelize.STRING, field: "url" },
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
          onDelete: "CASCADE",
          references: { model: "marketPlaces", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "propertyMarketPlaces",
      "categoryMarketPlaceId",
      {
        type: Sequelize.INTEGER,
        field: "categoryMarketPlaceId",
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
        references: { model: "categoryMarketPlaces", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["propertyMarketPlaces", "categoryMarketPlaceId", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["categoryMarketPlaces", { transaction }],
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
