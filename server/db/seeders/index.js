"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("typePrices", [
            { name: "Закупочная цена", },
            { name: "Минимальная цена", },
        ])
        // await queryInterface.bulkInsert("categories", [
        //     {
        //         name: "Товары и услуги",
        //         description: "",
        //         parent_id: "rootFolder",
        //         // createdAt: new Date(),
        //         // updatedAt: new Date(),
        //     },
        // ])

    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("priceType", null, {});
        await queryInterface.bulkDelete("productCategory", null, {});
    },
};