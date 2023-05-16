const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "categories", deps: []
 * createTable() => "employees", deps: []
 * createTable() => "marketPlaces", deps: []
 * createTable() => "syncInfos", deps: []
 * createTable() => "typePrices", deps: []
 * createTable() => "imagesProducts", deps: [imagesProducts]
 * createTable() => "products", deps: [categories]
 * createTable() => "prices", deps: [typePrices, products]
 * createTable() => "properties", deps: [marketPlaces, products]
 *
 */

const info = {
  revision: 1,
  name: "init",
  created: "2023-05-15T10:11:49.292Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "categories",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        externalCodeMS: {
          type: Sequelize.STRING,
          field: "externalCodeMS",
          unique: true,
        },
        parent_id: { type: Sequelize.STRING, field: "parent_id" },
        description: { type: Sequelize.STRING, field: "description" },
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
        archived: {
          type: Sequelize.INTEGER,
          field: "archived",
          defaultValue: 0,
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
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "marketPlaces",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        token: { type: Sequelize.STRING, field: "token" },
        description: { type: Sequelize.STRING, field: "description" },
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
      "syncInfos",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        info: { type: Sequelize.STRING, field: "info" },
        module: { type: Sequelize.STRING, field: "module" },
        resultError: {
          type: Sequelize.INTEGER,
          field: "resultError",
          defaultValue: 0,
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
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "typePrices",
      {
        name: {
          type: Sequelize.STRING,
          field: "name",
          allowNull: false,
          unique: true,
          primaryKey: true,
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
      "imagesProducts",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        nameFiles: { type: Sequelize.STRING, field: "nameFiles" },
        pathName: { type: Sequelize.STRING, field: "pathName" },
        typeImage: { type: Sequelize.STRING(4), field: "typeImage" },
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
          references: { model: "imagesProducts", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "products",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        article: { type: Sequelize.STRING, field: "article" },
        name: { type: Sequelize.STRING, field: "name" },
        uom: { type: Sequelize.STRING, field: "uom" },
        archived: {
          type: Sequelize.INTEGER,
          field: "archived",
          defaultValue: false,
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
        categoryId: {
          type: Sequelize.INTEGER,
          field: "categoryId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "categories", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "prices",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        price: {
          type: Sequelize.DECIMAL(10, 2),
          field: "price",
          allowNull: false,
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
        typePriceId: {
          type: Sequelize.STRING,
          field: "typePriceId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "typePrices", key: "name" },
          allowNull: true,
        },
        productId: {
          type: Sequelize.INTEGER,
          field: "productId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "products", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "properties",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
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
        marketPlaceId: {
          type: Sequelize.INTEGER,
          field: "marketPlaceId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "marketPlaces", key: "id" },
          allowNull: true,
        },
        productId: {
          type: Sequelize.INTEGER,
          field: "productId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "products", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["categories", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["employees", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["imagesProducts", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["marketPlaces", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["prices", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["products", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["properties", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["syncInfos", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["typePrices", { transaction }],
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
