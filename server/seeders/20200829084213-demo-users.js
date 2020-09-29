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
      "Users",
      [
        {
          username: "john",
          email: "john@gmail.com",
          password:
            "$2b$10$tbGhRJ/v4RzXI0Ej1GxYL.YNgL4YcNTrYepi79NvoZHU4b.0AO24m",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "ben",
          email: "ben@gmail.com",
          password:
            "$2b$10$bQzyf4WhWsjWFsZC.V2oX.YsLeQCGhENVFJdH6pCbLJw4xiQzTj7a",
          role: "deliverer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "liza",
          email: "liza@gmail.com",
          password:
            "$2b$10$pG6kS4CODpP2BCvV0RPA6eQjMbP.AefsIDgk3Zyeoh8jgHF97laQq",
          role: "user",
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
    await queryInterface.bulkDelete("Users", null, {});
  },
};
