const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "uoms", deps: []
 * createTable() => "categoryProperties", deps: [categoryProperties, categoryProperties]
 * addColumn(productId) => "barcodes"
 * addColumn(productId) => "prices"
 * addColumn(uomId) => "products"
 * addColumn(categoryId) => "products"
 *
 */

const info = {
  revision: 6,
  name: "allTables",
  created: "2023-03-01T06:27:15.360Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "uoms",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
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
  {
    fn: "createTable",
    params: [
      "categoryProperties",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        allow_Null: { type: Sequelize.BOOLEAN, field: "allow_Null" },
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
        categoryId: {
          type: Sequelize.INTEGER,
          field: "categoryId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "categoryProperties", key: "id" },
          allowNull: true,
        },
        propertyId: {
          type: Sequelize.INTEGER,
          field: "propertyId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "categoryProperties", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "barcodes",
      "productId",
      {
        type: Sequelize.INTEGER,
        field: "productId",
        onUpdate: "NO ACTION",
        onDelete: "CASCADE",
        references: { model: "barcodes", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "prices",
      "productId",
      {
        type: Sequelize.INTEGER,
        field: "productId",
        onUpdate: "NO ACTION",
        onDelete: "CASCADE",
        references: { model: "prices", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "products",
      "uomId",
      {
        type: Sequelize.INTEGER,
        field: "uomId",
        onUpdate: "NO ACTION",
        onDelete: "CASCADE",
        references: { model: "products", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "products",
      "categoryId",
      {
        type: Sequelize.INTEGER,
        field: "categoryId",
        onUpdate: "NO ACTION",
        onDelete: "CASCADE",
        references: { model: "products", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["barcodes", "productId", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["prices", "productId", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["products", "uomId", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["products", "categoryId", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["categoryProperties", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["uoms", { transaction }],
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
