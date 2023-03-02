"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("typePrices", [
            {
                name: "Закупочная цена",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
        await queryInterface.bulkInsert("uoms", [
            {
                name: "шт",
                fullName: "Штука",
                digitalCode: "796",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
        await queryInterface.bulkInsert("categories", [
            {
                id: 0,
                name: "Товары и услуги",
                description: "",
                parent_id: "0",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])

    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("typePrices", null, {});
        await queryInterface.bulkDelete("uoms", null, {});
        await queryInterface.bulkDelete("categories", null, {});
    },
};