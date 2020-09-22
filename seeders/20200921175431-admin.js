'use strict';
const adminModel = require('../models').Admin
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await adminModel.create({
      firstname: "amine",
      lastname: "hadef",
      email: "amine@gmail.com",
      password: await bcrypt.hash("Amine1234@", 10),
      niveau: 3
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
