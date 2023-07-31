const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "categories", deps: []
 * createTable() => "employees", deps: []
 * createTable() => "marketPlaces", deps: []
 * createTable() => "syncInfos", deps: []
 * createTable() => "typePrices", deps: []
 * createTable() => "categoryMarketPlaces", deps: [marketPlaces]
 * createTable() => "products", deps: [categories]
 * createTable() => "cardMPs", deps: [cardMPs, marketPlaces, categoryMarketPlaces, products]
 * createTable() => "imagesProducts", deps: [products]
 * createTable() => "prices", deps: [typePrices, products]
 * createTable() => "properties", deps: [products]
 * createTable() => "propertyCardMPs", deps: [cardMPs, properties]
 * createTable() => "propertyMarketPlaces", deps: [marketPlaces, categoryMarketPlaces]
 *
 */

const info = {
  revision: 1,
  name: "init",
  created: "2023-07-28T08:22:38.662Z",
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
        action: { type: Sequelize.STRING, field: "action" },
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
        marketPId: { type: Sequelize.STRING, field: "marketPId" },
        description: { type: Sequelize.TEXT, field: "description" },
        info: { type: Sequelize.STRING, field: "info" },
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
        idMS: { type: Sequelize.STRING, field: "idMS" },
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
      "cardMPs",
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
        parentId: {
          type: Sequelize.INTEGER,
          field: "parentId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "cardMPs", key: "id" },
          allowNull: true,
        },
        marketPlaceId: {
          type: Sequelize.INTEGER,
          field: "marketPlaceId",
          onUpdate: "NO ACTION",
          onDelete: "NO ACTION",
          references: { model: "marketPlaces", key: "id" },
          allowNull: true,
        },
        categoryMarketPlaceId: {
          type: Sequelize.INTEGER,
          field: "categoryMarketPlaceId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "categoryMarketPlaces", key: "id" },
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
        url: { type: Sequelize.STRING, field: "url" },
        typeImage: { type: Sequelize.STRING, field: "typeImage" },
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
        idMsTypePrice: { type: Sequelize.STRING, field: "idMsTypePrice" },
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
        value: { type: Sequelize.STRING, field: "value" },
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
      "propertyCardMPs",
      {
        value: { type: Sequelize.STRING, field: "value" },
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
        cardMPId: {
          type: Sequelize.INTEGER,
          field: "cardMPId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "cardMPs", key: "id" },
          primaryKey: true,
        },
        propertyId: {
          type: Sequelize.INTEGER,
          field: "propertyId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "properties", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "propertyMarketPlaces",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        params: { type: Sequelize.STRING, field: "params" },
        description: { type: Sequelize.TEXT, field: "description" },
        example: { type: Sequelize.TEXT, field: "example" },
        requiredField: { type: Sequelize.INTEGER, field: "requiredField" },
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
          onDelete: "NO ACTION",
          references: { model: "marketPlaces", key: "id" },
          allowNull: true,
        },
        categoryMarketPlaceId: {
          type: Sequelize.INTEGER,
          field: "categoryMarketPlaceId",
          onUpdate: "NO ACTION",
          onDelete: "NO ACTION",
          references: { model: "categoryMarketPlaces", key: "id" },
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
    params: ["cardMPs", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["categories", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["categoryMarketPlaces", { transaction }],
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
    params: ["propertyCardMPs", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["propertyMarketPlaces", { transaction }],
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
