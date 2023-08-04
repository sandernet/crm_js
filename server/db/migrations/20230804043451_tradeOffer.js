const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "tradeOffers", deps: [tradeOffers, marketplaces, marketplaceCategories, products]
 * addColumn(tradeOfferId) => "productProperties"
 *
 */

const info = {
  revision: 2,
  name: "tradeOffer",
  created: "2023-08-04T04:34:51.900Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "tradeOffers",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
        archived: {
          type: Sequelize.INTEGER,
          field: "archived",
          defaultValue: 1,
        },
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
        parent_id: {
          type: Sequelize.INTEGER,
          field: "parent_id",
          onUpdate: "NO ACTION",
          onDelete: "SET NULL",
          references: { model: "tradeOffers", key: "id" },
          allowNull: true,
        },
        marketplaceId: {
          type: Sequelize.INTEGER,
          field: "marketplaceId",
          onUpdate: "NO ACTION",
          onDelete: "NO ACTION",
          references: { model: "marketplaces", key: "id" },
          allowNull: true,
        },
        marketplaceCategoryId: {
          type: Sequelize.INTEGER,
          field: "marketplaceCategoryId",
          onUpdate: "NO ACTION",
          onDelete: "NO ACTION",
          references: { model: "marketplaceCategories", key: "id" },
          allowNull: true,
        },
        productId: {
          type: Sequelize.INTEGER,
          field: "productId",
          onUpdate: "NO ACTION",
          onDelete: "NO ACTION",
          references: { model: "products", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "productProperties",
      "tradeOfferId",
      {
        type: Sequelize.INTEGER,
        field: "tradeOfferId",
        onUpdate: "NO ACTION",
        onDelete: "CASCADE",
        references: { model: "tradeOffers", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["productProperties", "tradeOfferId", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["tradeOffers", { transaction }],
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
