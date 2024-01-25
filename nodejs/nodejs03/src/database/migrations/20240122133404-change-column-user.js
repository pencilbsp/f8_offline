"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("User", "name", {
      type: Sequelize.STRING(50),
      allowNull: false,
    })

    await queryInterface.renameColumn("User", "name", "full_name")
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("User", "full_name", "name")

    await queryInterface.changeColumn("User", "name", {
      type: Sequelize.STRING(30),
      allowNull: true,
    })
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
}
