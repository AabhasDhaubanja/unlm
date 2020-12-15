"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Images",
      [
        {
          url: "/products/_MG_9485.jpg",
          imageableId: 1,
          imageableType: "product",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: "/products/_MG_9532.jpg",
          imageableId: 2,
          imageableType: "product",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: "/products/_MG_9492.jpg",
          imageableId: 3,
          imageableType: "product",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: "/products/_MG_9507-Recovered.jpg",
          imageableId: 4,
          imageableType: "product",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Images", null, {});
  },
};
