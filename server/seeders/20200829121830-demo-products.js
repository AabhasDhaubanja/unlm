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
      "Products",
      [
        {
          name: "Sweater",
          price: 2080,
          categoryId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Camera Bag",
          price: 21080,
          categoryId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bag",
          price: 1000,
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Down Jacket",
          price: 5000,
          categoryId: 7,
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
    await queryInterface.bulkDelete("Products", null, {});
  },
};
