const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "categories", deps: []
 * createTable() => "employees", deps: []
 * createTable() => "marketPlaces", deps: []
 * createTable() => "properties", deps: []
 * createTable() => "syncInfos", deps: []
 * createTable() => "typePrices", deps: []
 * createTable() => "uoms", deps: []
 * createTable() => "barcodes", deps: [barcodes, barcodes]
 * createTable() => "categoryProperties", deps: [categoryProperties, categoryProperties]
 * createTable() => "imagesProducts", deps: [imagesProducts]
 * createTable() => "prices", deps: [prices, prices]
 * createTable() => "products", deps: [categories, uoms]
 * createTable() => "valueProperties", deps: [valueProperties, valueProperties]
 *
 */

const info = {
  revision: 1,
  name: "init",
  created: "2023-03-31T10:35:02.959Z",
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
        description: { type: Sequelize.STRING, field: "description" },
        parent_id: { type: Sequelize.STRING, field: "parent_id" },
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
        externalCodeMS: {
          type: Sequelize.STRING,
          field: "externalCodeMS",
          unique: true,
        },
        description: { type: Sequelize.STRING, field: "description" },
        code: { type: Sequelize.STRING, field: "code" },
        deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "barcodes",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        typeBarcodes: {
          type: Sequelize.STRING,
          field: "typeBarcodes",
          allowNull: false,
        },
        barcode: { type: Sequelize.STRING, field: "barcode", allowNull: false },
        deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
        productId: {
          type: Sequelize.INTEGER,
          field: "productId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "barcodes", key: "id" },
          allowNull: true,
        },
        marketPlaceId: {
          type: Sequelize.INTEGER,
          field: "marketPlaceId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "barcodes", key: "id" },
          allowNull: true,
        },
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
        allow_Null: { type: Sequelize.INTEGER, field: "allow_Null" },
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
          type: Sequelize.INTEGER,
          field: "typePriceId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "prices", key: "id" },
          allowNull: true,
        },
        productId: {
          type: Sequelize.INTEGER,
          field: "productId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "prices", key: "id" },
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
        artical: { type: Sequelize.STRING, field: "artical" },
        idMS: { type: Sequelize.STRING, field: "idMS" },
        vendorCode: { type: Sequelize.STRING, field: "vendorCode" },
        name: { type: Sequelize.STRING, field: "name" },
        description: { type: Sequelize.TEXT, field: "description" },
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
        uomId: {
          type: Sequelize.INTEGER,
          field: "uomId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "uoms", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
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
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["barcodes", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["categories", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["categoryProperties", { transaction }],
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
  {
    fn: "dropTable",
    params: ["uoms", { transaction }],
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
