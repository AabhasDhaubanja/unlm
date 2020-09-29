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
          url: "/products/casual_shoes.jpg",
          imageableId: 1,
          imageableType: "product",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: "/products/curry_4.jpg",
          imageableId: 2,
          imageableType: "product",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: "/products/plain_tshirt.jpg",
          imageableId: 3,
          imageableType: "product",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: "/products/running_shorts.jpg",
          imageableId: 4,
          imageableType: "product",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: "/carousel/1.jpg",
          imageableId: 1,
          imageableType: "carousel",
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
