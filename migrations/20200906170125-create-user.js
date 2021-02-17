'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.DATE
      },
      email: {
        type: Sequelize.STRING
      },
      keyConfirmeEmail: {
        type: Sequelize.STRING
      },
      emailIsConfirmed: {
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      role: {
        type: Sequelize.INTEGER
      },
      isAccepted: {
        type: Sequelize.INTEGER
      },
      idAdmin: {
        type: Sequelize.INTEGER
      },
      job: {
        type: Sequelize.STRING
      },
      photoProfile:{
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('users');
  }
};