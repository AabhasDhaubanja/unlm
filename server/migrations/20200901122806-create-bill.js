'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      grandTotal: {
        type: Sequelize.BIGINT
      },
      phoneNumber: {
        type: Sequelize.BIGINT
      },
      shippingCost: {
        type: Sequelize.INTEGER
      },
      shippingAddress: {
        type: Sequelize.STRING
      },
      payed: {
        type: Sequelize.BOOLEAN
      },
      delivered: {
        type: Sequelize.BOOLEAN
      },
      userId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bills');
  }
};