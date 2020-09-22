'use strict';
var faker = require('faker');
const userModel = require('../models').user

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < 200; i++) {
      faker.locale = "fr"
      await userModel.create({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        description: faker.lorem.text(50),
        role: faker.random.number({
          "min": 1,
          "max": 2
        }),
        isAccepted: 1,
        idAdmin: 1,
        job: faker.name.jobTitle().substring(4)
      })
    }
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
