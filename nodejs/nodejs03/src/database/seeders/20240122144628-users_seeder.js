"use strict"

const { faker } = require("@faker-js/faker")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const users = []
    for (let index = 0; index < 50; index++) {
      users.push({
        full_name: faker.person.fullName(),
        email: faker.internet.email(),
        status: faker.datatype.boolean(),
        created_at: faker.date.past(),
        updated_at: faker.date.past(),
        address: faker.location.streetAddress(),
      })
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}
