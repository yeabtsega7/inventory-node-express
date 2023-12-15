"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MonthlySales", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      month: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      totalAmount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      totalPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      totalQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("MonthlySales");
  },
};
