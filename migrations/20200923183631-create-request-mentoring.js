'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('requestMentorings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idMentor: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      idMentorer: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.TEXT
      },
      isAccepted: {
        allowNull: false,
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
    await queryInterface.dropTable('requestMentorings');
  }
};