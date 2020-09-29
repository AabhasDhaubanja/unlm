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
      "Categories",
      [
        {
          name: "Men",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Women",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kids",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "T-Shirts",
          superId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Shoes",
          superId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Shorts",
          superId: 1,
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
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
