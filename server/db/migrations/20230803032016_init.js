const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "loggings", deps: []
 * createTable() => "marketplaces", deps: []
 * createTable() => "priceTypes", deps: []
 * createTable() => "productCategories", deps: []
 * createTable() => "users", deps: []
 * createTable() => "marketplaceCategories", deps: [marketplaces]
 * createTable() => "marketplaceProperties", deps: [marketplaces, marketplaceCategories]
 * createTable() => "products", deps: [productCategories]
 * createTable() => "prices", deps: [priceTypes, products]
 * createTable() => "productImages", deps: [products]
 * createTable() => "productProperties", deps: [marketplaceProperties, products]
 * createTable() => "userRoles", deps: [users]
 *
 */

const info = {
  revision: 1,
  name: "init",
  created: "2023-08-03T03:20:16.541Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "loggings",
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
      "marketplaces",
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
      "priceTypes",
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
      "productCategories",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.TEXT, field: "name" },
        externalCodeMS: {
          type: Sequelize.STRING,
          field: "externalCodeMS",
          unique: true,
        },
        parent_id: { type: Sequelize.STRING, field: "parent_id" },
        description: { type: Sequelize.TEXT, field: "description" },
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
      "users",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.TEXT, field: "name" },
        externalCode: { type: Sequelize.STRING, field: "externalCode" },
        archived: {
          type: Sequelize.INTEGER,
          field: "archived",
          defaultValue: 0,
        },
        fullName: { type: Sequelize.STRING, field: "fullName" },
        phone: { type: Sequelize.STRING, field: "phone" },
        position: { type: Sequelize.STRING, field: "position" },
        login: { type: Sequelize.TEXT, field: "login" },
        password: { type: Sequelize.TEXT, field: "password" },
        description: { type: Sequelize.TEXT, field: "description" },
        isAdmin: { type: Sequelize.BOOLEAN, field: "isAdmin" },
        isSuperAdmin: { type: Sequelize.BOOLEAN, field: "isSuperAdmin" },
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
      "marketplaceCategories",
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
        marketplaceId: {
          type: Sequelize.INTEGER,
          field: "marketplaceId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "marketplaces", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "marketplaceProperties",
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
        productCategoryId: {
          type: Sequelize.INTEGER,
          field: "productCategoryId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "productCategories", key: "id" },
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
        priceTypeName: {
          type: Sequelize.STRING,
          field: "priceTypeName",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "priceTypes", key: "name" },
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
      "productImages",
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
      "productProperties",
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
        marketplacePropertyId: {
          type: Sequelize.INTEGER,
          field: "marketplacePropertyId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "marketplaceProperties", key: "id" },
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
      "userRoles",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        caption: { type: Sequelize.TEXT, field: "caption" },
        description: { type: Sequelize.TEXT, field: "description" },
        controller: { type: Sequelize.TEXT, field: "controller" },
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
        userId: {
          type: Sequelize.INTEGER,
          field: "userId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
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
    params: ["loggings", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["marketplaceCategories", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["marketplaces", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["marketplaceProperties", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["prices", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["priceTypes", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["productCategories", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["productImages", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["products", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["productProperties", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["users", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["userRoles", { transaction }],
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
