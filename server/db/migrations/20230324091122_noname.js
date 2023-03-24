const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(createdAt) => "typePrices"
 * removeColumn(createdAt) => "uoms"
 * removeColumn(updatedAt) => "uoms"
 * addColumn(idMoySklad) => "categories"
 * addColumn(artical) => "products"
 *
 */

const info = {
  revision: 15,
  name: "noname",
  created: "2023-03-24T09:11:22.836Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["typePrices", "createdAt", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["uoms", "createdAt", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["uoms", "updatedAt", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "categories",
      "idMoySklad",
      { type: Sequelize.STRING, field: "idMoySklad", unique: true },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "products",
      "artical",
      { type: Sequelize.STRING, field: "artical" },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["categories", "idMoySklad", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["products", "artical", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "typePrices",
      "createdAt",
      { type: Sequelize.DATE, field: "createdAt", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "uoms",
      "createdAt",
      { type: Sequelize.DATE, field: "createdAt", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "uoms",
      "updatedAt",
      { type: Sequelize.DATE, field: "updatedAt", allowNull: false },
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
